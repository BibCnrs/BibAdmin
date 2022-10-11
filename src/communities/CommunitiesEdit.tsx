import {
  BooleanInput,
  Edit,
  SimpleForm,
  TextInput,
  useRecordContext,
} from "react-admin";
import EditToolbar from "../components/EditToolbar";
import { ListEditActions } from "../components/ListActions";

const CommunitiesTitle = () => {
  const record = useRecordContext();
  return record ? record.name : "";
};

const CommunitiesEdit = () => (
  <Edit title={<CommunitiesTitle />} actions={<ListEditActions />}>
    <SimpleForm toolbar={<EditToolbar />}>
      <TextInput
        source="name"
        label="resources.communities.fields.name"
        fullWidth
      />
      <TextInput
        source="gate"
        label="resources.communities.fields.gate"
        fullWidth
      />
      <TextInput
        source="user_id"
        label="resources.communities.fields.user_id"
        fullWidth
      />
      <TextInput
        source="password"
        label="resources.communities.fields.password"
        fullWidth
      />
      <TextInput
        source="profile"
        label="resources.communities.fields.profile"
        fullWidth
      />
      <BooleanInput source="ebsco" label="resources.communities.fields.ebsco" />
    </SimpleForm>
  </Edit>
);

export default CommunitiesEdit;
