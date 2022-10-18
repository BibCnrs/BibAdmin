import { DataProvider, fetchUtils, Options } from "react-admin";
import { stringify } from "query-string";
import jsonServerProvider from "ra-data-json-server";
import loadImage from "blueimp-load-image";

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

/**
 * Convert a `Image` object returned by the upload input into a base 64 string.
 * That's not the most optimized way to store images in production, but it's
 * enough to illustrate the idea of data provider decoration.
 */
const convertImageToBase64 = (file: File) => {
  if (!file) {
    return Promise.resolve(null);
  }

  return new Promise((resolve, reject) => {
    loadImage(
      file,
      (image) => {
        const canvas = image as HTMLCanvasElement;
        try {
          resolve(canvas.toDataURL(file.type));
        } catch (error) {
          reject(error);
        }
      },
      { maxWidth: 200, maxHeight: 40, orientation: true, canvas: true } // Options
    );
  });
};

const jsonServerDataProvider = jsonServerProvider(apiUrl, httpClient);

const dataProvider: DataProvider = {
  ...jsonServerDataProvider,
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    let { field, order } = params.sort;
    const filters = fetchUtils.flattenObject(params.filter);

    const query: any = {
      _page: page || 1,
      _perPage: perPage || 10,
    };

    query._sortField = field;
    query._sortDir = order.toLocaleLowerCase() || "asc";

    if (Object.keys(filters).length > 0) {
      query._filters = JSON.stringify(filters);
    }

    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(
        headers?.get("content-range")?.split("/")?.pop() ?? "0",
        10
      ),
    }));
  },
  update: async (resource, params) => {
    if (
      !params.data.image ||
      (typeof params.data.image === "string" &&
        params.data.image.includes("base64"))
    ) {
      // fallback to the default implementation
      return jsonServerDataProvider.update(resource, params);
    }
    const base64Image = await convertImageToBase64(params.data.image.rawFile);
    return jsonServerDataProvider.update(resource, {
      ...params,
      data: {
        ...params.data,
        image: base64Image,
      },
    });
  },
  create: async (resource, params) => {
    if (
      !params.data.image ||
      (typeof params.data.image === "string" &&
        params.data.image.includes("base64"))
    ) {
      // fallback to the default implementation
      return jsonServerDataProvider.create(resource, params);
    }
    const base64Image = await convertImageToBase64(params.data.image.rawFile);
    return jsonServerDataProvider.create(resource, {
      ...params,
      data: {
        ...params.data,
        image: base64Image,
      },
    });
  },
};

export default dataProvider;
