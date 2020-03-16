import React from "react";
import PropTypes from "prop-types";
import { DateInput } from "react-admin-date-inputs";
import DateFnsUtils from "@date-io/date-fns";
import frLocale from "date-fns/locale/fr";

export const FrenchDateInput = ({ source, label }) => {
  return (
    <DateInput
      source={source}
      label={label}
      providerOptions={{
        utils: DateFnsUtils,
        locale: frLocale
      }}
      options={{
        format: "dd-MM-yyyy",
        clearable: true
      }}
    />
  );
};

FrenchDateInput.propTypes = {
  source: PropTypes.string,
  label: PropTypes.string
};
