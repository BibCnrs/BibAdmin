import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  TextField,
  DateField,
  BooleanField,
  TextInput,
  BooleanInput,
  LongTextInput,
  ReferenceInput,
  ReferenceArrayInput,
  AutocompleteInput,
  SelectArrayInput,
  downloadCSV
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import { DateInput } from "react-admin-date-inputs";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";
import ListActions from "../components/ListActions";
import { PostPagination } from "../utils/pagination";
import { AutoCompleteReferenceInput } from "../components/AutoCompleteReferenceInput";

const JanusFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput
      source="like_janus_account.uid"
      label="resources.janusAccounts.fields.uid"
    />

    <TextInput
      type="email"
      source="like_janus_account.mail"
      label="resources.janusAccounts.fields.mail"
    />

    <AutoCompleteReferenceInput
      label="resources.janusAccounts.fields.primary_institute"
      source="institutes.id"
      reference="institutes"
      field="institute"
      optionText="name"
      isFilter={true}
    />

    <ReferenceArrayInput
      label="resources.janusAccounts.fields.additional_institutes"
      source="additional_institutes"
      reference="institutes"
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>

    <AutoCompleteReferenceInput
      label="resources.janusAccounts.fields.primary_unit"
      source="units.id"
      reference="units"
      field="unit"
      optionText="code"
      isFilter={true}
    />

    <ReferenceArrayInput
      label="resources.janusAccounts.fields.additional_units"
      source="additional_units"
      reference="units"
    >
      <SelectArrayInput optionText="code" />
    </ReferenceArrayInput>

    <ReferenceInput
      label="resources.janusAccounts.fields.communities"
      source="community.id"
      reference="communities"
      perPage={100}
    >
      <AutocompleteInput optionText="name" />
    </ReferenceInput>

    <DateInput
      source="to_janus_account.last_connexion"
      label="resources.janusAccounts.fields.last_connexion_before"
      options={{ format: "MM-dd-yyyy" }}
    />

    <DateInput
      source="from_janus_account.last_connexion"
      label="resources.janusAccounts.fields.last_connexion_after"
      options={{ format: "MM-dd-yyyy" }}
    />
    <DateInput
      source="to_janus_account.first_connexion"
      label="resources.janusAccounts.fields.first_connexion_before"
      options={{ format: "MM-dd-yyyy" }}
    />
    <DateInput
      source="from_janus_account.first_connexion"
      label="resources.janusAccounts.fields.first_connexion_after"
      options={{ format: "MM-dd-yyyy" }}
    />

    <BooleanInput
      source="janus_account.cnrs"
      label="resources.janusAccounts.fields.cnrs"
    />
    <BooleanInput
      source="janus_account.active"
      label="resources.janusAccounts.fields.active"
      defaultValue={true}
    />
  </Filter>
);

const exporter = async (records, fetchRelatedRecords) => {
  const listPrincipalUnit = await fetchRelatedRecords(
    records,
    "primary_unit",
    "units"
  );
  const listAdditionalUnit = await fetchRelatedRecords(
    records,
    "additional_units",
    "units"
  );
  const listAllCommunities = await fetchRelatedRecords(
    records,
    "all_communities",
    "communities"
  );
  const listCommunities = await fetchRelatedRecords(
    records,
    "communities",
    "communities"
  );
  const listPrincipalIt = await fetchRelatedRecords(
    records,
    "primary_institute",
    "institutes"
  );
  const listAdditionalIt = await fetchRelatedRecords(
    records,
    "additional_institutes",
    "institutes"
  );
  const dataWithRelation = records.map(record => ({
    ...record,
    primary_unit:
      listPrincipalUnit[record.primary_unit] &&
      listPrincipalUnit[record.primary_unit].code,
    primary_institute:
      listPrincipalIt[record.primary_institute] &&
      listPrincipalIt[record.primary_institute].name,
    all_communities: record.all_communities.map(
      n => listAllCommunities[n].name
    ),
    communities: record.communities.map(n => listCommunities[n].name),
    additional_units: record.additional_units.map(
      n => listAdditionalUnit[n].name
    ),
    additional_institutes: record.additional_institutes.map(
      n => listAdditionalIt[n].name
    )
  }));
  const data = dataWithRelation.map(record =>
    renameKeys(record, "janusAccounts")
  );
  const csv = convertToCSV(data, {
    delimiter: ";"
  });
  downloadCSV(csv, "janusAccounts");
};

export const JanusList = props => (
  <List
    {...props}
    filters={<JanusFilter />}
    perPage={10}
    pagination={<PostPagination />}
    sort={{ field: "uid" }}
    exporter={exporter}
  >
    <Datagrid>
      <LinkEdit source="uid" label="resources.janusAccounts.fields.uid" />
      <LinkEdit source="mail" label="resources.janusAccounts.fields.mail" />

      <ReferenceField
        label="resources.janusAccounts.fields.primary_institute"
        source="primary_institute"
        reference="institutes"
        linkType="show"
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.additional_institutes"
        reference="institutes"
        source="additional_institutes"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceField
        label="resources.janusAccounts.fields.primary_unit"
        source="primary_unit"
        reference="units"
        linkType="show"
      >
        <TextField source="code" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.all_communities"
        reference="communities"
        source="all_communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <DateField
        source="last_connexion"
        label="resources.janusAccounts.fields.last_connexion"
      />
      <DateField
        source="first_connexion"
        label="resources.janusAccounts.fields.first_connexion"
      />
      <BooleanField
        source="active"
        label="resources.janusAccounts.fields.active"
      />
      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const JanusTitle = ({ record }) => {
  return record.uid;
};

export const JanusEdit = ({ ...props }) => (
  <Edit title={<JanusTitle />} {...props} actions={<ListActions />}>
    <SimpleForm>
      <TextField source="uid" label="resources.janusAccounts.fields.uid" />
      <BooleanField source="cnrs" label="resources.janusAccounts.fields.cnrs" />

      <TextInput source="name" label="resources.janusAccounts.fields.name" />

      <TextInput
        source="firstname"
        label="resources.janusAccounts.fields.firstname"
      />

      <TextInput
        type="email"
        source="mail"
        label="resources.janusAccounts.fields.mail"
      />

      <ReferenceField
        label="resources.janusAccounts.fields.primary_institute"
        source="primary_institute"
        reference="institutes"
        linkType="show"
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.additional_institutes"
        reference="institutes"
        source="additional_institutes"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceField
        label="resources.janusAccounts.fields.primary_unit"
        source="primary_unit"
        reference="units"
        linkType="show"
      >
        <TextField source="code" />
      </ReferenceField>

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.additional_units"
        reference="units"
        source="additional_units"
      >
        <SelectArrayInput optionText="code" />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.communities"
        reference="communities"
        source="communities"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.all_communities"
        reference="communities"
        source="all_communities"
        className="tags"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <DateField
        source="last_connexion"
        label="resources.janusAccounts.fields.last_connexion"
      />
      <DateField
        source="first_connexion"
        label="resources.janusAccounts.fields.first_connexion"
      />
      <BooleanInput
        source="active"
        label="resources.janusAccounts.fields.active"
      />
      <LongTextInput
        source="comment"
        label="resources.janusAccounts.fields.comment"
      />
    </SimpleForm>
  </Edit>
);

export const JanusCreate = ({ ...props }) => (
  <Create {...props} redirect="list" actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextField source="uid" label="resources.janusAccounts.fields.uid" />
      <BooleanField source="cnrs" label="resources.janusAccounts.fields.cnrs" />

      <TextInput source="name" label="resources.janusAccounts.fields.name" />

      <TextInput
        source="firstname"
        label="resources.janusAccounts.fields.firstname"
      />

      <TextInput
        type="email"
        source="mail"
        label="resources.janusAccounts.fields.mail"
      />

      <ReferenceField
        label="resources.janusAccounts.fields.primary_institute"
        source="primary_institute"
        reference="institutes"
        linkType="show"
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.additional_institutes"
        reference="institutes"
        source="additional_institutes"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceField
        label="resources.janusAccounts.fields.primary_unit"
        source="primary_unit"
        reference="units"
        linkType="show"
      >
        <TextField source="code" />
      </ReferenceField>

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.additional_units"
        reference="units"
        source="additional_units"
      >
        <SelectArrayInput optionText="code" />
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.janusAccounts.fields.communities"
        reference="communities"
        source="communities"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>

      <ReferenceArrayField
        label="resources.janusAccounts.fields.all_communities"
        reference="communities"
        source="all_communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <DateField
        source="last_connexion"
        label="resources.janusAccounts.fields.last_connexion"
      />
      <DateField
        source="first_connexion"
        label="resources.janusAccounts.fields.first_connexion"
      />
      <BooleanInput
        source="active"
        label="resources.janusAccounts.fields.active"
      />
      <LongTextInput
        source="comment"
        label="resources.janusAccounts.fields.comment"
      />
    </SimpleForm>
  </Create>
);
