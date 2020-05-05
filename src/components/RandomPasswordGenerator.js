import React from "react";
import PropTypes from "prop-types";
import { TextInput } from "react-admin";

class RandomPasswordGenerator extends React.Component {
  render() {
    const { label, source } = this.props;
    const password = Math.random()
      .toString(36)
      .slice(-6)
      .toUpperCase();

    return <TextInput label={label} source={source} defaultValue={password} />;
  }
}

RandomPasswordGenerator.propTypes = {
  label: PropTypes.string,
  source: PropTypes.string
};

export default RandomPasswordGenerator;
