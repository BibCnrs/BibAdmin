import React from "react";
import { CardActions, ListButton } from "react-admin";

const ListActions = ({ basePath, data, resource }) => (
  <CardActions>
    <ListButton basePath={basePath} record={data} />
  </CardActions>
);

export default ListActions;
