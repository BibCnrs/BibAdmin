import {
  AutocompleteArrayInput,
  AutocompleteInput,
  BooleanInput,
  Create,
  DateInput,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { CreateActions } from "../components/Actions";
import RandomPasswordGenerator from "../components/RandomPasswordGenerator";

const InistCreate = () => (
  <Create actions={<CreateActions />} redirect="list">
    <SimpleForm>
      <TextInput
        source="username"
        label="resources.inistAccounts.fields.username"
        validate={required()}
        fullWidth
      />
      <RandomPasswordGenerator
        source="password"
        label="resources.inistAccounts.fields.password"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="name"
        label="resources.inistAccounts.fields.name"
        fullWidth
      />
      <TextInput
        source="firstname"
        label="resources.inistAccounts.fields.firstname"
        fullWidth
      />
      <TextInput
        type="email"
        source="mail"
        label="resources.inistAccounts.fields.mail"
        fullWidth
      />

      <TextInput
        source="phone"
        label="resources.inistAccounts.fields.phone"
        fullWidth
      />

      <TextInput
        source="dr"
        label="resources.inistAccounts.fields.dr"
        fullWidth
      />

      <ReferenceInput
        label="resources.inistAccounts.fields.main_institute"
        source="main_institute"
        reference="institutes"
      >
        <AutocompleteInput
          filterToQuery={(searchText) => ({
            "like_institute.name": searchText,
          })}
          optionText="name"
        />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.institutes"
        source="institutes"
        reference="institutes"
      >
        <AutocompleteArrayInput
          filterToQuery={(searchText) => ({
            "like_institute.name": searchText,
          })}
          optionText="name"
        />
      </ReferenceArrayInput>

      <ReferenceInput
        label="resources.inistAccounts.fields.main_unit"
        source="main_unit"
        reference="units"
      >
        <AutocompleteInput
          filterToQuery={(searchText) => ({
            "like_unit.code": searchText,
          })}
          optionText="code"
        />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.inistAccounts.fields.units"
        source="units"
        reference="units"
      >
        <AutocompleteArrayInput
          filterToQuery={(searchText) => ({
            "like_unit.code": searchText,
          })}
          optionText="code"
        />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.units.fields.communities"
        source="communities"
        reference="communities"
      >
        <AutocompleteArrayInput
          filterToQuery={(searchText) => ({
            like_name: searchText,
          })}
          optionText="name"
        />
      </ReferenceArrayInput>

      <DateInput
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
      />
      <DateInput
        source="expiration_date"
        label="resources.inistAccounts.fields.expiration_date"
      />
      <BooleanInput
        source="active"
        label="resources.inistAccounts.fields.active"
      />
      <TextInput
        multiline
        source="comment"
        label="resources.inistAccounts.fields.comment"
        fullWidth
      />
    </SimpleForm>
  </Create>
);

export default InistCreate;
