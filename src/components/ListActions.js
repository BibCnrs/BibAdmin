import React from "react";
import PropTypes from "prop-types";
import {
  TopToolbar,
  ListButton,
  CloneButton,
  DeleteWithConfirmButton
} from "react-admin";

export const ListEditActions = ({ basePath, data, resource }) => (
  <TopToolbar>
    <DeleteWithConfirmButton
      basePath={basePath}
      record={data}
      resource={resource}
    />
    <CloneButton basePath={basePath} record={data} />
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

export const ListActions = ({ basePath, data }) => (
  <TopToolbar>
    <ListButton basePath={basePath} record={data} />
  </TopToolbar>
);

ListEditActions.propTypes = {
  basePath: PropTypes.string,
  data: PropTypes.object,
  resource: PropTypes.string
};

ListActions.propTypes = {
  basePath: PropTypes.string,
  data: PropTypes.object
};

export default ListActions;
