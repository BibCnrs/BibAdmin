import { stringify } from "query-string";
import {
  fetchUtils,
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} from "react-admin";

/**
 * permet d'effectuer des requêtes HTTP
 */

/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = "";
    const options = {};
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        let { field, order } = params.sort;
        const filters = fetchUtils.flattenObject(params.filter);

        const query = {
          _page: page || 1,
          _perPage: perPage || 10
        };

        /**
         * permet d'effectuer un tri (améliorer l'api pour supprimer cette portion de code)
         */
        if (field && field !== "id") {
          switch (resource) {
            case "inistAccounts":
              field = `inist_account.${field}`;
              break;
            case "janusAccounts":
              if (field !== "primary_unit" && field !== "primary_institute") {
                field = `janus_account.${field}`;
              }
              break;
            case "institutes":
              field = `institute.${field}`;
              break;
            case "units":
              field = `unit.${field}`;
              break;
            case "databases":
              field = `database.${field}`;
              break;
            case "section_cn":
              field = `section_cn.${field}`;
              break;
            case "revues":
              field = `revue.${field}`;
              break;
            default:
              break;
          }
          query._sortField = field;
          query._sortDir = order || "ASC";
        }

        if (Object.keys(filters).length > 0) {
          query._filters = JSON.stringify(filters);
        }
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          ...fetchUtils.flattenObject(params.filter),
          [params.target]: params.id,
          _sort: field,
          _order: order,
          _start: (page - 1) * perPage,
          _end: page * perPage,
          _page: page,
          _perPage: perPage
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = "PUT";
        options.body = params.data;
        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        options.method = "POST";
        options.body = params.data;
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = "DELETE";
        break;
      case GET_MANY: {
        const query = {
          [`id_like`]: params.ids.join("|")
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.rawFile);

      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY_REFERENCE:
        if (!headers.has("x-total-count")) {
          throw new Error(
            "The X-Total-Count header is missing in the HTTP Response. The jsonServer Data Provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?"
          );
        }
        return {
          data: json,
          total: parseInt(
            headers
              .get("x-total-count")
              .split("/")
              .pop(),
            10
          )
        };
      case CREATE:
        return { data: { ...params.data, id: json.id } };
      default:
        return { data: json };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    // json-server doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
    if (type === UPDATE_MANY) {
      return Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "PATCH",
            body: JSON.stringify(params.data)
          })
        )
      ).then(responses => ({
        data: responses.map(response => response.json)
      }));
    }
    // json-server doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
    if (type === DELETE_MANY) {
      return Promise.all(
        params.ids.map(id =>
          httpClient(`${apiUrl}/${resource}/${id}`, {
            method: "DELETE"
          })
        )
      ).then(responses => ({
        data: responses.map(response => response.json)
      }));
    }

    const { url, options } = convertDataRequestToHTTP(type, resource, params);
    if (options.body) {
      const main_institute = sessionStorage.getItem("main_institute");
      const primary_institute = sessionStorage.getItem("primary_institute");
      const primary_institutes = sessionStorage.getItem("primary_institutes");
      const secondary_institutes = sessionStorage.getItem(
        "secondary_institutes"
      );
      const additional_institutes = sessionStorage.getItem(
        "additional_institutes"
      );
      const institutes = sessionStorage.getItem("institutes");
      const main_unit = sessionStorage.getItem("main_unit");
      const primary_unit = sessionStorage.getItem("primary_unit");
      const secondary_units = sessionStorage.getItem("secondary_units");
      const additional_units = sessionStorage.getItem("additional_units");
      const units = sessionStorage.getItem("units");
      const communities = sessionStorage.getItem("communities");
      const sections_cn = sessionStorage.getItem("sections_cn");
      if (main_institute) {
        options.body.main_institute = main_institute;
      }
      if (primary_institute) {
        options.body.primary_institute = primary_institute;
      }
      if (primary_institutes) {
        options.body.primary_institutes = primary_institutes;
      }
      if (institutes) {
        options.body.institutes = institutes.split(",");
      } else {
        options.body.institutes = [];
      }
      if (secondary_institutes) {
        options.body.secondary_institutes = secondary_institutes.split(",");
      } else {
        options.body.secondary_institutes = [];
      }
      if (additional_institutes) {
        options.body.additional_institutes = additional_institutes.split(",");
      } else {
        options.body.additional_institutes = [];
      }
      if (main_unit) {
        options.body.main_unit = main_unit;
      }
      if (primary_unit) {
        options.body.primary_unit = primary_unit;
      }
      if (units) {
        options.body.units = units.split(",");
      } else {
        options.body.units = [];
      }
      if (secondary_units) {
        options.body.secondary_units = secondary_units.split(",");
      } else {
        options.body.secondary_units = [];
      }
      if (additional_units) {
        options.body.additional_units = additional_units.split(",");
      } else {
        options.body.additional_units = [];
      }
      if (communities) {
        options.body.communities = communities.split(",");
      } else {
        options.body.communities = [];
      }
      if (sections_cn) {
        options.body.sections_cn = sections_cn.split(",");
      } else {
        options.body.sections_cn = [];
      }
      if (options.body.expiration_date) {
        options.body.expiration_date.setHours(6);
      }
      if (options.body.subscription_date) {
        options.body.subscription_date.setHours(6);
      }
      sessionStorage.clear();
      if (options.body.image) {
        return convertFileToBase64(options.body.image).then(image => {
          options.body.image = image;
          options.body = JSON.stringify(options.body);
          return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
          );
        });
      }
      options.body = JSON.stringify(options.body);
    }
    return httpClient(url, options).then(response =>
      convertHTTPResponse(response, type, resource, params)
    );
  };
};
