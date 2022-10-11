import { fetchUtils, Options } from "react-admin";
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
const dataProvider = simpleRestProvider(apiUrl, httpClient);

export default dataProvider;
