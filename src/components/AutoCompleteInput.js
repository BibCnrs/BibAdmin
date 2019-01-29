import React from "react";
import PropTypes from "prop-types";
import AsyncSelect from "react-select/lib/Async";
import { Labeled } from "react-admin";
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

  // change value in temp database after each change
  handleChange = selectedOption => {
    const { record, resource, source, isMulti, filter } = this.props;
    let listValue = "";
    if (selectedOption) {
      if (isMulti) {
        listValue = selectedOption.map(n => n.value);
      } else {
        listValue = selectedOption.value;
        if (filter) {
          const previousFilter = decodeURI(window.location.hash).split(
            /({.*})/
          )[1];
          const newFilter = `{"${filter}":"${listValue}"}`;
          if (previousFilter) {
            const query = JSON.parse(previousFilter.replace(/%3A/g, ":"));
            const newUrl = Object.assign(query, JSON.parse(newFilter));
            document.location.href = `#/${resource}?filter=${JSON.stringify(
              newUrl
            )}`;
          } else {
            document.location.href = `#/${resource}?filter=${newFilter}`;
          }
        }
      }
      sessionStorage.setItem(source, listValue);
    } else {
      this.componentWillUnmount();
    }

    this.setState({
      selectedOption,
      listValue: listValue.toString()
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

  // for edit add previous value in autocomplete
  async componentWillMount() {
    const { record, source, reference, filter, optionText } = this.props;
    const url = decodeURI(window.location.hash).split(/({.*})/)[1];
    if (record && record[source]) {
      let previousValue = record[source];
      if (!Array.isArray(record[source])) {
        previousValue = [previousValue];
      }
      if (previousValue.length > 0) {
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
    } else if (url) {
      const query = JSON.parse(url.replace(/%3A/g, ":"));
      const value = filter ? url[filter] : Object.values(query);
      if (value) {
        const data = await fetchApi(
          `${process.env.REACT_APP_BIBAPI_HOST}/${reference}/${Object.values(
            query
          )}`
        );
        if (data) {
          this.setState({
            selectedOption: {
              value: data.id,
              label: data[optionText]
            }
          });
        }
      }
    }
  }

  // remove applied filter when remove component
  componentWillUnmount() {
    const { filter } = this.props;
    if (filter) {
      const fragment = decodeURI(window.location.hash).split(/({.*})/)[1];
      window.location.hash = decodeURI(window.location.hash).replace(
        fragment,
        ""
      );
      window.location.hash = window.location.hash.replace(
        /&?(filter=&|filter=%7B%7D&)/,
        ""
      );
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
          className={filter ? "width-200" : ""}
          isClearable={true}
        />
      </Labeled>
    );
  }
}

AutoCompleteInput.propTypes = {
  label: PropTypes.string,
  source: PropTypes.string,
  resource: PropTypes.string,
  reference: PropTypes.string,
  field: PropTypes.string,
  isMulti: PropTypes.bool,
  filter: PropTypes.string,
  optionText: PropTypes.string
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
