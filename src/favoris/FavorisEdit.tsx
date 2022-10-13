import {
  AutocompleteArrayInput,
  Edit,
  ReferenceArrayInput,
  required,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import { EditActions } from "../components/Actions";
import EditToolbar from "../components/EditToolbar";

const FavorisTitle = () => {
  const record = useRecordContext();
  return record ? record.title : "";
};

const FavorisEdit = () => (
  <Edit title={<FavorisTitle />} actions={<EditActions />}>
    <SimpleForm toolbar={<EditToolbar />}>
      <TextInput
        source="title"
        label="resources.revues.fields.title"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="url"
        label="resources.revues.fields.url"
        validate={required()}
        fullWidth
      />

      <ReferenceArrayInput
        label="resources.revues.fields.communities"
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

export default FavorisEdit;
