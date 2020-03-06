import React from "react";
import { TopToolbar, ListButton } from "react-admin";
import DeleteButtonWithConfirmation from "./DeleteButtonWithConfirmation";

export const ListEditActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <DeleteButtonWithConfirmation
      basePath={basePath}
      record={data}
      resource={resource}
    />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

export const ListActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

export default ListActions;
