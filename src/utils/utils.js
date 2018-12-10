import locale from "../i18n/fr";

export const renameKeys = (obj, pageName) => {
  delete obj["totalcount"];
  const keyValues = Object.keys(obj).map(key => {
    const newKey = locale.resources[pageName].fields[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};
