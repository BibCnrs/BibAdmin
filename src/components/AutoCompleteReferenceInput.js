import React from "react";
import Autosuggest from "react-autosuggest";
import { Labeled } from "react-admin";
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

class AutoCompleteReferenceInput extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      suggestions: [],
      source: null,
      query: null
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
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

  onSuggestionSelected = () => {
    const { resource, source } = this.props;
    const { query } = this.state;
    document.location.href = `#/${resource}?filter={"${source}":"${query}"}`;
  };

  // when user do selection
  getSuggestionValue = suggestion => {
    const { optionText } = this.props;
    this.setState({
      query: suggestion.id
    });
    return suggestion[optionText];
  };

  // for edit add default value
  componentWillMount() {
    const { choices, optionText = "code" } = this.props;
    this.setState({
      value: choices[0][optionText],
      optionText
    });
  }

  // render list
  renderSuggestion(suggestion, { query }) {
    const regex = new RegExp(`(${query})`, "i");
    const name = {
      __html: suggestion.code.replace(regex, "<b>$1</b>")
    };
    return <span dangerouslySetInnerHTML={name} />;
  }

  render() {
    const { value, suggestions } = this.state;
    const { label } = this.props;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: "Recherche...",
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Labeled label={label}>
          <Autosuggest
            suggestions={suggestions.slice(0, 10)}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            onSuggestionSelected={this.onSuggestionSelected}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            highlightFirstSuggestion={true}
          />
        </Labeled>
      </div>
    );
  }
}

export { AutoCompleteReferenceInput };
