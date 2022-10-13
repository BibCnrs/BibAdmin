import {
  AutocompleteArrayInput,
  AutocompleteInput,
  BooleanInput,
  ChipField,
  DateField,
  DateInput,
  Edit,
  Labeled,
  ReferenceArrayField,
  ReferenceArrayInput,
  ReferenceInput,
  required,
  SimpleForm,
  SingleFieldList,
  TextInput,
  useRecordContext,
} from "react-admin";
import { EditActions } from "../components/Actions";
import EditToolbar from "../components/EditToolbar";

const convertEmptyDateInputToNull = (data: any) => {
  if (data.subscription_date === "") {
    data.subscription_date = null;
  }
  if (data.expiration_date === "") {
    data.expiration_date = null;
  }
  return data;
};

const InistTitle = () => {
  const record = useRecordContext();
  return record ? record.username : "";
};

const InistEdit = () => (
  <Edit
    title={<InistTitle />}
    actions={<EditActions />}
    transform={convertEmptyDateInputToNull}
  >
    <SimpleForm toolbar={<EditToolbar />}>
      <TextInput
        source="username"
        label="resources.inistAccounts.fields.username"
        validate={required()}
        fullWidth
      />
      <TextInput
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

      <Labeled>
        <ReferenceArrayField
          label="resources.inistAccounts.fields.all_communities"
          source="communities"
          reference="communities"
          perPage={100}
        >
          <SingleFieldList>
            <ChipField source="name" />
          </SingleFieldList>
        </ReferenceArrayField>
      </Labeled>

      <DateInput
        source="subscription_date"
        label="resources.inistAccounts.fields.subscription_date"
      />
      <DateInput
        source="expiration_date"
        label="resources.inistAccounts.fields.expiration_date"
      />
      <Labeled>
        <DateField
          source="last_connexion"
          label="resources.inistAccounts.fields.last_connexion"
        />
      </Labeled>
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
  </Edit>
);

export default InistEdit;
