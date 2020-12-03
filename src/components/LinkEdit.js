import React from "react";
import PropTypes from "prop-types";

const LinkEdit = ({ record, basePath, source }) => {
  if (record && record.id) {
    const url = `#${basePath}/${record.id}`;
    return <a href={url}>{record[source]}</a>;
  }
  return null;
};

LinkEdit.propTypes = {
  record: PropTypes.object,
  basePath: PropTypes.string,
  source: PropTypes.string
};

export default LinkEdit;
