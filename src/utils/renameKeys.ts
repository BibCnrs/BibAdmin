import { RaRecord } from "react-admin";
import locale from "../i18n/fr";

type PageName = keyof Omit<typeof locale.resources, "notification">;

export const renameKeys = (obj: RaRecord, pageName: PageName) => {
  if (obj && obj.totalcount) {
    delete obj["totalcount"];
  }
  const keyValues = Object.keys(obj).map((key) => {
    // @ts-ignore
    const newKey = locale.resources[pageName].fields[key] || key;
    return { [newKey]: obj[key] };
  });
  return Object.assign({}, ...keyValues);
};
