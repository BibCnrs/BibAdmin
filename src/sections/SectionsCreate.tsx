import {
  AutocompleteArrayInput,
  AutocompleteInput,
  Create,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { CreateActions } from "../components/Actions";

const SectionsCreate = () => (
  <Create actions={<CreateActions />} redirect="list">
    <SimpleForm>
      <TextInput
        source="name"
        label="resources.section_cn.fields.name"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="code"
        label="resources.section_cn.fields.code"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="comment"
        label="resources.section_cn.fields.comment"
        fullWidth
      />
      <ReferenceInput
        label="resources.section_cn.fields.primary_institutes"
        source="primary_institutes"
        reference="institutes"
      >
        <AutocompleteInput
          filterToQuery={(searchText) => ({
            "like_institute.name": searchText,
          })}
          optionText="name"
          fullWidth
        />
      </ReferenceInput>
      <ReferenceArrayInput
        label="resources.section_cn.fields.secondary_institutes"
        source="secondary_institutes"
        reference="institutes"
      >
        <AutocompleteArrayInput
          filterToQuery={(searchText) => ({
            "like_institute.name": searchText,
          })}
          optionText="name"
          fullWidth
        />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);

export default SectionsCreate;
