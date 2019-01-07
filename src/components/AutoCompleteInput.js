import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/lib/Async";
import { Labeled, TextInput, FormDataConsumer } from "react-admin";
import { addField, FieldTitle } from "ra-core";
import axios from "axios";

// get data on api
const fetchApi = async url => {
  const { data } = await axios({
    url,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  });
  return data;
};

class AutoCompleteInput extends React.Component {
  state = {
    selectedOption: null,
    listValue: ""
  };

  handleChange = selectedOption => {
    const { record, element } = this.props;
    let listValue = "";
    if (Array.isArray(selectedOption)) {
      listValue = selectedOption.map(n => n.value).toString();
    } else {
      listValue = selectedOption.value;
    }
    this.setState({ selectedOption, listValue });

    if (record) {
      record[element] = selectedOption.value;
      // console.log(record);
    }
  };

  componentWillReceiveProps() {
    console.log("props");
  }

  // Autosuggest will call this function every time you need to update suggestions. (async query)
  promiseOptions = async value => {
    const { reference, field, optionText } = this.props;
    let filter = "";
    if (field) {
      filter = `{"like_${field}.${optionText}":"${value}"}`;
    } else {
      filter = `{"like_${optionText}":"${value}"}`;
    }
    if (value.length > 1) {
      const data = await fetchApi(
        `${process.env.REACT_APP_BIBAPI_HOST}/${reference}?_filters=${filter}`
      );
      if (data) {
        const selectedOption = data.map(n => ({
          label: n.name,
          value: n.id
        }));
        return selectedOption;
      }
      return [];
    }
  };

  async componentWillMount() {
    const { record, element, reference } = this.props;
    if (record && record[element]) {
      const data = await fetchApi(
        `${process.env.REACT_APP_BIBAPI_HOST}/${reference}/${record[element]}`
      );
      if (data) {
        this.setState({
          selectedOption: {
            label: data.name,
            value: data.id
          }
        });
      }
    }
  }

  render() {
    const { selectedOption, listValue } = this.state;
    const { label, isMulti, source } = this.props;

    console.log(this.props.record);

    return (
      /*<span>
          <Labeled label={label}>
            <AsyncSelect
              cacheOptions
              defaultOptions
              value={selectedOption}
              onChange={this.handleChange}
              loadOptions={this.promiseOptions}
              isMulti={isMulti}
            />
          </Labeled>
          <FormDataConsumer>
            {({ formData, ...rest }) => (
              <TextInput
                id={source}
                source={getValue(source, formData)}
                defaultValue={listValue}
              />
            )}
          </FormDataConsumer>
        </span>*/
      <Labeled label={label}>
        <AsyncSelect
          cacheOptions
          defaultOptions
          value={selectedOption}
          onChange={this.handleChange}
          loadOptions={this.promiseOptions}
          isMulti={isMulti}
        />
      </Labeled>
    );
  }
}

AutoCompleteInput.propTypes = {
  input: PropTypes.object,
  isRequired: PropTypes.bool,
  label: PropTypes.string,
  options: PropTypes.object,
  resource: PropTypes.string,
  source: PropTypes.string,
  element: PropTypes.string,
  reference: PropTypes.string,
  field: PropTypes.string,
  className: PropTypes.string
};

AutoCompleteInput.defaultProps = {
  input: {},
  isRequired: "false",
  label: "",
  options: {},
  resource: "",
  source: "",
  element: "",
  reference: "",
  field: "",
  className: ""
};

export default addField(AutoCompleteInput);
