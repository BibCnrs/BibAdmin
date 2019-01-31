import React from "react";
import { CardActions, ListButton } from "react-admin";
import DeleteButtonWithConfirmation from "./DeleteButtonWithConfirmation";

export const ListEditActions = ({ basePath, data, resource }) => (
  <CardActions>
    <DeleteButtonWithConfirmation
      basePath={basePath}
      record={data}
      resource={resource}
    />
    <ListButton basePath={basePath} record={data} />
  </CardActions>
);

export const ListActions = ({ basePath, data, resource }) => (
  <CardActions>
    <ListButton basePath={basePath} record={data} />
  </CardActions>
);

export default ListActions;
