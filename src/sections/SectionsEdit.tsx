import {
  AutocompleteArrayInput,
  AutocompleteInput,
  Edit,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import { EditActions } from "../components/Actions";
import EditToolbar from "../components/EditToolbar";

const SectionsTitle = () => {
  const record = useRecordContext();
  return record ? record.name : "";
};

const fromArrayToInt = (value: any) => {
  if (value instanceof Array) {
    return value[0];
  }
  return value;
};

const transform = (data: any) => {
  return {
    ...data,
    primary_institutes: fromArrayToInt(data.primary_institutes),
  };
};

const SectionsEdit = () => (
  <Edit
    title={<SectionsTitle />}
    actions={<EditActions />}
    transform={transform}
  >
    <SimpleForm toolbar={<EditToolbar />}>
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
            name: searchText,
          })}
          optionText="name"
          format={fromArrayToInt}
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
            name: searchText,
          })}
          optionText="name"
          fullWidth
        />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export default SectionsEdit;
