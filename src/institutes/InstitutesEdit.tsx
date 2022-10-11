import {
  AutocompleteArrayInput,
  Edit,
  ReferenceArrayInput,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import { EditActions } from "../components/Actions";
import EditToolbar from "../components/EditToolbar";

const InstitutesTitle = () => {
  const record = useRecordContext();
  return record ? record.name : "";
};

const InstitutesEdit = () => (
  <Edit title={<InstitutesTitle />} actions={<EditActions />}>
    <SimpleForm toolbar={<EditToolbar />}>
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
  </Edit>
);

export default InstitutesEdit;
