import React from "react";
import Autosuggest from "react-autosuggest";
import { escapeRegexCharacters } from "../utils/utils";

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = (value, choices = []) => {
  const escapedValue = escapeRegexCharacters(value.trim());

  // search only if length > 2
  if (escapedValue.length <= 1) {
    return [];
  }

  const regex = new RegExp(`^${escapedValue}`, "i");

  return choices.filter(choice => regex.test(choice.name));
};

// render list
function renderSuggestion(suggestion, { query }) {
  const regex = new RegExp(`(${query})`, "i");
  const name = {
    __html: suggestion.name.replace(regex, "<b>$1</b>")
  };

  return <span dangerouslySetInnerHTML={name} />;
}

class AutoCompleteReferenceInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
      source: null
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    const { choices, source } = this.props;
    const data = choices.map(n => ({ id: n.id, name: n.name }));
    this.setState({
      suggestions: getSuggestions(value, data),
      source
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  // when user do selection
  getSuggestionValue = suggestion => {
    const { resource, source } = this.props;
    document.location.href = `#/${resource}?filter={"${source}": "${
      suggestion.id
    }"}`;
    return suggestion.name;
  };

  render() {
    const { value, suggestions } = this.state;
    //const { label } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Recherche...",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        highlightFirstSuggestion={true}
      />
    );
  }
}

export { AutoCompleteReferenceInput };
