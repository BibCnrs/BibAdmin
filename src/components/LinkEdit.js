import React from "react";

const LinkEdit = ({ record, basePath, source }) => {
  const url = `#${basePath}/${record.id}`;
  return <a href={url}>{record[source]}</a>;
};

LinkEdit.defaultProps = {
  addLabel: true
};

export default LinkEdit;
