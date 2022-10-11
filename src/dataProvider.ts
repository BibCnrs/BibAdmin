import { DataProvider, fetchUtils, Options } from "react-admin";
import { stringify } from "query-string";
import simpleRestProvider from "ra-data-simple-rest";

const apiUrl = process.env.REACT_APP_BIBAPI_HOST || "";

const httpClient = (url: string, options: Options = {}) => {
  const requestHeaders = (options.headers ||
    new Headers({
      Accept: "application/json",
    })) as Headers;
  if (!options.headers) {
    options.headers = new Headers({ Accept: "application/json" });
  }

  requestHeaders.set(
    "Authorization",
    `Bearer ${localStorage.getItem("token")}`
  );
  return fetchUtils.fetchJson(url, { ...options, headers: requestHeaders });
};
const dataProvider: DataProvider = {
  ...simpleRestProvider(apiUrl, httpClient),
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    let { field, order } = params.sort;
    const filters = fetchUtils.flattenObject(params.filter);

    const query: any = {
      _page: page || 1,
      _perPage: perPage || 10,
    };

    /**
     * permet d'effectuer un tri
     * TODO: améliorer l'api pour supprimer cette portion de code
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

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get("content-range") ?? "0", 10),
    }));
  },
};

export default dataProvider;
