import React from "react";
import { DateInput } from "react-admin-date-inputs";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
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
