import {
  AutocompleteArrayInput,
  Create,
  CreateActions,
  ReferenceArrayInput,
  SimpleForm,
  TextInput,
} from "react-admin";

const InstitutesCreate = () => (
  <Create actions={<CreateActions />} redirect="list">
    <SimpleForm>
      <TextInput source="code" label="resources.institutes.fields.code" />
      <TextInput source="name" label="resources.institutes.fields.name" />
      <ReferenceArrayInput
        label="resources.institutes.fields.communities"
        source="communities"
        reference="communities"
      >
        <AutocompleteArrayInput
          filterToQuery={(searchText) => ({ like_name: searchText })}
          optionText="name"
        />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

export default InstitutesCreate;
