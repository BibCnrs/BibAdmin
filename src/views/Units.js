import React, { Fragment } from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  TextField,
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  BooleanField,
  ChipField,
  TextInput,
  NumberInput,
  BooleanInput,
  LongTextInput,
  downloadCSV,
  ExportButton,
  SaveButton,
  Toolbar
} from "react-admin";
import { unparse as convertToCSV } from "papaparse/papaparse.min";
import { renameKeys } from "../utils/utils";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";
import { ListActions, ListEditActions } from "../components/ListActions";
import { PostPagination } from "../utils/pagination";
import AutoCompleteInput from "../components/AutoCompleteInput";

const UrlSearchInist = ({ source, record = {} }) => {
  const url = `#/inistAccounts?filter={"main_unit":${record.id}}`;
  return <a href={url}>{record.nb_inist_account}</a>;
};

UrlSearchInist.defaultProps = {
  addLabel: true
};

const UrlSearchJanus = ({ source, record = {} }) => {
  const url = `#/janusAccounts?filter={"janus_account.primary_unit":${
    record.id
  }}`;
  return <a href={url}>{record.nb_janus_account}</a>;
};

UrlSearchJanus.defaultProps = {
  addLabel: true
};

const UnitsFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput source="like_unit.code" label="resources.units.fields.code" />
    <TextInput source="like_unit.name" label="resources.units.fields.name" />

    <AutoCompleteInput
      label="resources.units.fields.communities"
      source="community"
      reference="communities"
      field="community"
      filter="community.id"
    />

    <AutoCompleteInput
      label="resources.units.fields.main_institute"
      source="main_institute"
      reference="institutes"
      field="institute"
      filter="unit.main_institute"
    />

    <AutoCompleteInput
      label="resources.units.fields.institutes"
      source="institutes"
      reference="institutes"
      field="institute"
      filter="institute.id"
    />

    <AutoCompleteInput
      label="resources.units.fields.section_cn"
      source="section_cn"
      reference="section_cn"
      field="section_cn"
      filter="section_cn.id"
    />

    <BooleanInput
      source="unit.active"
      label="resources.inistAccounts.fields.active"
    />
  </Filter>
);

const exporter = async (records, fetchRelatedRecords, ...rest) => {
  const listPrincipalIt = await fetchRelatedRecords(
    records,
    "main_institute",
    "institutes"
  );
  const listCommunities = await fetchRelatedRecords(
    records,
    "communities",
    "communities"
  );
  const listInstitutes = await fetchRelatedRecords(
    records,
    "institutes",
    "institutes"
  );
  const listSections = await fetchRelatedRecords(
    records,
    "sections_cn",
    "section_cn"
  );
  const dataWithRelation = records.map(record => ({
    ...record,
    main_institute:
      listPrincipalIt[record.main_institute] &&
      listPrincipalIt[record.main_institute].name,
    communities: record.communities.map(n => listCommunities[n].name),
    institutes: record.institutes.map(n => listInstitutes[n].name),
    sections_cn: record.sections_cn.map(n => listSections[n].name)
  }));
  const data = dataWithRelation.map(record => renameKeys(record, "units"));
  const csv = convertToCSV(data, {
    delimiter: ";"
  });
  downloadCSV(csv, "units");
};

ExportButton.defaultProps = {
  label: "ra.action.export",
  maxResults: 100000
};

const PostBulkActionButtons = props => (
  <Fragment>
    <DeleteButtonWithConfirmation label="Supprimer" {...props} />
  </Fragment>
);

export const UnitsList = ({ ...props }) => (
  <List
    {...props}
    filters={<UnitsFilter />}
    perPage={10}
    pagination={<PostPagination />}
    exporter={exporter}
    bulkActionButtons={<PostBulkActionButtons />}
  >
    <Datagrid>
      <LinkEdit source="code" label="resources.units.fields.code" />

      <LinkEdit source="name" label="resources.units.fields.name" />

      <ReferenceField
        label="resources.units.fields.main_institute"
        source="main_institute"
        reference="institutes"
        linkType="show"
        allowEmpty={true}
      >
        <TextField source="name" />
      </ReferenceField>

      <ReferenceArrayField
        label="resources.units.fields.institutes"
        reference="institutes"
        source="institutes"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <UrlSearchInist label="Nombre de compte Inist" />
      <UrlSearchJanus label="Nombre de compte Janus" />

      <ReferenceArrayField
        label="resources.units.fields.communities"
        reference="communities"
        source="communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <ReferenceArrayField
        label="resources.units.fields.section_cn"
        reference="section_cn"
        source="sections_cn"
      >
        <SingleFieldList>
          <ChipField source="code" />
        </SingleFieldList>
      </ReferenceArrayField>

      <BooleanField source="active" label="resources.units.fields.active" />
      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const UnitsTitle = ({ record }) => {
  return record.name;
};

const PostEditToolbar = props => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const UnitsEdit = ({ ...props }) => (
  <Edit title={<UnitsTitle />} {...props} actions={<ListEditActions />}>
    <SimpleForm toolbar={<PostEditToolbar />}>
      <TextInput source="code" label="resources.units.fields.code" />
      <TextInput source="name" label="resources.units.fields.name" />
      <TextInput
        source="implantation"
        label="resources.units.fields.implantation"
      />
      <TextInput source="body" label="resources.units.fields.body" />

      <TextInput source="building" label="resources.units.fields.building" />
      <TextInput source="street" label="resources.units.fields.street" />
      <TextInput
        source="post_office_box"
        label="resources.units.fields.post_office_box"
      />
      <TextInput
        source="postal_code"
        label="resources.units.fields.postal_code"
      />
      <TextInput source="town" label="resources.units.fields.town" />
      <TextInput source="country" label="resources.units.fields.country" />
      <TextInput source="unit_dr" label="resources.units.fields.unit_dr" />

      <NumberInput
        source="nb_researcher_cnrs"
        label="resources.units.fields.nb_researcher_cnrs"
      />
      <NumberInput
        source="nb_researcher_nocnrs"
        label="resources.units.fields.nb_researcher_nocnrs"
      />
      <NumberInput
        source="nb_doctorant"
        label="resources.units.fields.nb_doctorant"
      />
      <NumberInput
        source="nb_post_doctorant"
        label="resources.units.fields.nb_post_doctorant"
      />

      <TextInput
        source="director_name"
        label="resources.units.fields.director_name"
      />
      <TextInput
        source="director_firstname"
        label="resources.units.fields.director_firstname"
      />
      <TextInput
        type="email"
        source="director_mail"
        label="resources.units.fields.director_mail"
      />

      <TextInput
        source="correspondant_documentaire"
        label="resources.units.fields.correspondant_documentaire"
      />
      <TextInput source="cd_phone" label="resources.units.fields.cd_phone" />
      <TextInput
        type="email"
        source="cd_mail"
        label="resources.units.fields.cd_mail"
      />

      <TextInput
        source="correspondant_informatique"
        label="resources.units.fields.correspondant_informatique"
      />
      <TextInput source="ci_phone" label="resources.units.fields.ci_phone" />
      <TextInput
        type="email"
        source="ci_mail"
        label="resources.units.fields.ci_mail"
      />

      <AutoCompleteInput
        label="resources.units.fields.main_institute"
        source="main_institute"
        reference="institutes"
        field="institute"
      />

      <AutoCompleteInput
        label="resources.units.fields.institutes"
        source="institutes"
        reference="institutes"
        field="institute"
        isMulti={true}
      />

      <UrlSearchInist label="Nombre de compte Inist" />
      <UrlSearchJanus label="Nombre de compte Janus" />

      <AutoCompleteInput
        label="resources.units.fields.communities"
        source="communities"
        reference="communities"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.units.fields.section_cn"
        source="sections_cn"
        reference="section_cn"
        field="section_cn"
        isMulti={true}
      />

      <LongTextInput
        source="comment"
        label="resources.inistAccounts.fields.comment"
      />

      <BooleanInput
        source="active"
        label="resources.inistAccounts.fields.active"
      />
    </SimpleForm>
  </Edit>
);

export const UnitsCreate = ({ ...props }) => (
  <Create {...props} redirect="list" actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="code" label="resources.units.fields.code" />
      <TextInput source="name" label="resources.units.fields.name" />
      <TextInput
        source="implantation"
        label="resources.units.fields.implantation"
      />
      <TextInput source="body" label="resources.units.fields.body" />

      <TextInput source="building" label="resources.units.fields.building" />
      <TextInput source="street" label="resources.units.fields.street" />
      <TextInput
        source="post_office_box"
        label="resources.units.fields.post_office_box"
      />
      <TextInput
        source="postal_code"
        label="resources.units.fields.postal_code"
      />
      <TextInput source="town" label="resources.units.fields.town" />
      <TextInput source="country" label="resources.units.fields.country" />
      <TextInput source="unit_dr" label="resources.units.fields.unit_dr" />

      <NumberInput
        source="nb_researcher_cnrs"
        label="resources.units.fields.nb_researcher_cnrs"
      />
      <NumberInput
        source="nb_researcher_nocnrs"
        label="resources.units.fields.nb_researcher_nocnrs"
      />
      <NumberInput
        source="nb_doctorant"
        label="resources.units.fields.nb_doctorant"
      />
      <NumberInput
        source="nb_post_doctorant"
        label="resources.units.fields.nb_post_doctorant"
      />

      <TextInput
        source="director_name"
        label="resources.units.fields.director_name"
      />
      <TextInput
        source="director_firstname"
        label="resources.units.fields.director_firstname"
      />
      <TextInput
        type="email"
        source="director_mail"
        label="resources.units.fields.director_mail"
      />

      <TextInput
        source="correspondant_documentaire"
        label="resources.units.fields.correspondant_documentaire"
      />
      <TextInput source="cd_phone" label="resources.units.fields.cd_phone" />
      <TextInput
        type="email"
        source="cd_mail"
        label="resources.units.fields.cd_mail"
      />

      <TextInput
        source="correspondant_informatique"
        label="resources.units.fields.correspondant_informatique"
      />
      <TextInput source="ci_phone" label="resources.units.fields.ci_phone" />
      <TextInput
        type="email"
        source="ci_mail"
        label="resources.units.fields.ci_mail"
      />

      <AutoCompleteInput
        label="resources.units.fields.main_institute"
        source="main_institute"
        reference="institutes"
      />

      <AutoCompleteInput
        label="resources.units.fields.institutes"
        source="institutes"
        reference="institutes"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.units.fields.communities"
        source="communities"
        reference="communities"
        isMulti={true}
      />

      <AutoCompleteInput
        label="resources.units.fields.section_cn"
        source="sections_cn"
        reference="section_cn"
        isMulti={true}
      />

      <LongTextInput
        source="comment"
        label="resources.inistAccounts.fields.comment"
      />

      <BooleanInput
        source="active"
        label="resources.inistAccounts.fields.active"
      />
    </SimpleForm>
  </Create>
);
