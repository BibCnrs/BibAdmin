import React from "react";
import Autosuggest from "react-autosuggest";
import { Labeled } from "react-admin";
import axios from "axios";

// not clean but not other means
let optionTextForRenderSuggestion = null;

class AutoCompleteReferenceInput extends React.Component {
  constructor() {
    super();

    this.state = {
      value: "",
      suggestions: [],
      isFilter: false
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions. (ajax query)
  onSuggestionsFetchRequested = async ({ value }) => {
    const { reference, field, optionText } = this.props;
    optionTextForRenderSuggestion = optionText;
    let filter = "";
    if (field) {
      filter = `{"like_${field}.${optionText}":"${value}"}`;
    } else {
      filter = `{"like_${optionText}":"${value}"}`;
    }
    if (value.length > 1) {
      const { data } = await axios({
        url: `${
          process.env.REACT_APP_BIBAPI_HOST
        }/${reference}?_filters=${filter}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      this.setState({
        suggestions: data
      });
    }
  };

  // filter when element is selected (ONLY for filter)
  onSuggestionSelected = (event, { suggestion }) => {
    const { resource, element, isFilter } = this.props;
    if (isFilter === true) {
      document.location.href = `#/${resource}?filter={"${element}":"${
        suggestion.id
      }"}`;
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = suggestion => {
    const { optionText } = this.props;
    return suggestion[optionText];
  };

  async componentWillMount() {
    const { optionText, record, element, reference } = this.props;
    if (record[element]) {
      const { data } = await axios({
        url: `${process.env.REACT_APP_BIBAPI_HOST}/${reference}/${
          record[element]
        }`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      this.setState({
        value: data[optionText]
      });
    }
  }

  // render list
  renderSuggestion(suggestion, { query }) {
    const regex = new RegExp(`(${query})`, "i");
    const name = {
      __html: suggestion[optionTextForRenderSuggestion].replace(
        regex,
        "<b>$1</b>"
      )
    };
    return <span dangerouslySetInnerHTML={name} />;
  }

  render() {
    const { value, suggestions } = this.state;
    const { label } = this.props;

    const inputProps = {
      placeholder: "Recherche...",
      value,
      onChange: this.onChange
    };

    return (
      <Labeled label={label}>
        <Autosuggest
          id={label}
          suggestions={suggestions.slice(0, 20)}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
        />
      </Labeled>
    );
  }
}

export { AutoCompleteReferenceInput };
