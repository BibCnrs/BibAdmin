import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/async";
import { Labeled } from "react-admin";
import axios from "axios";

// get data on api
const fetchApi = async url => {
  url = url.replace(/([a-z])([/]{2})/, "$1/");
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

  // change value in temp database after each change
  handleChange = selectedOption => {
    const { source, filter, isMulti, parent } = this.props;
    let searchValue = "";
    if (selectedOption) {
      if (isMulti) {
        searchValue = selectedOption.map(n => n.value);
      } else {
        searchValue = selectedOption.value;
      }
      // if filter
      if (parent && filter) {
        parent.setFilters({
          [filter]: searchValue
        });
        parent.displayedFilters[source] = true;
      }
    }
    sessionStorage.setItem(source, searchValue);
    this.setState({
      selectedOption,
      listValue: searchValue.toString()
    });
  };

  // Autosuggest will call this function every time you need to update suggestions. (async query)
  promiseOptions = async value => {
    const { reference, field, optionText } = this.props;
    if (value.length > 1) {
      let filter = "";
      if (field) {
        filter = `{"like_${field}.${optionText}":"${value}"}`;
      } else {
        filter = `{"like_${optionText}":"${value}"}`;
      }
      const data = await fetchApi(
        `${process.env.REACT_APP_BIBAPI_HOST}/${reference}?_filters=${filter}`
      );
      if (data) {
        const selectedOption = data.map(n => ({
          label: n[optionText],
          value: n.id
        }));
        return selectedOption;
      }
      return [];
    }
  };

  async UNSAFE_componentWillMount() {
    const { record, source, reference, filter, optionText } = this.props;
    // add previous value in autocomplete for create and edit
    if (record && record[source] && !filter) {
      let previousValue = record[source];
      if (!Array.isArray(record[source])) {
        previousValue = [previousValue];
      }
      if (previousValue && previousValue.length > 0) {
        sessionStorage.setItem(source, previousValue.join(","));
      }
      const listData = await Promise.all(
        previousValue.map(element => {
          return fetchApi(
            `${process.env.REACT_APP_BIBAPI_HOST}/${reference}/${element}`
          );
        })
      );
      const selectedOption = listData.map(n => ({
        value: n.id,
        label: n[optionText]
      }));
      if (selectedOption) {
        this.setState({ selectedOption });
      }
    }
  }

  componentWillUnmount() {
    const { source, filter, parent } = this.props;
    // remove applied filter when remove component
    if (parent && filter) {
      parent.setFilters({
        [source]: ""
      });
      delete parent.displayedFilters[source];
    }
  }

  // reder autocomplete with parameters
  render() {
    const { selectedOption } = this.state;
    const { label, isMulti, filter } = this.props;

    return (
      <Labeled label={label}>
        <AsyncSelect
          cacheOptions
          defaultOptions
          value={selectedOption}
          onChange={this.handleChange}
          loadOptions={this.promiseOptions}
          isMulti={isMulti}
          className={`autocomplete ${filter ? "width-200" : ""}`}
          classNamePrefix="list-autocomplete"
          isClearable={true}
        />
      </Labeled>
    );
  }
}

AutoCompleteInput.propTypes = {
  record: PropTypes.any,
  label: PropTypes.string,
  source: PropTypes.string,
  resource: PropTypes.string,
  reference: PropTypes.string,
  field: PropTypes.string,
  isMulti: PropTypes.bool,
  filter: PropTypes.string,
  optionText: PropTypes.string,
  parent: PropTypes.any
};

AutoCompleteInput.defaultProps = {
  label: "",
  source: "",
  resource: "",
  reference: "",
  field: "",
  isMulti: false,
  filter: "",
  optionText: "name"
};

export default AutoCompleteInput;
