import React from "react";
import PropTypes from "prop-types";

const LinkEdit = ({ record, basePath, source }) => {
  const url = `#${basePath}/${record.id}`;
  return <a href={url}>{record[source]}</a>;
};

LinkEdit.propTypes = {
  record: PropTypes.object,
  basePath: PropTypes.string,
  source: PropTypes.string
};

LinkEdit.defaultProps = {
  addLabel: true
};

export default LinkEdit;
