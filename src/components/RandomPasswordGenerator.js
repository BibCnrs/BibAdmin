import React from "react";
import { TextInput } from "react-admin";

class RandomPasswordGenerator extends React.Component {
  state = {
    password: false
  };

  componentDidMount() {
    this.setState({
      password: Math.random()
        .toString(36)
        .slice(-6)
        .toUpperCase()
    });
  }

  render() {
    const { label, source } = this.props;
    const { password } = this.state;

    return <TextInput label={label} source={source} defaultValue={password} />;
  }
}

export default RandomPasswordGenerator;
