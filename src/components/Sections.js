import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  DeleteButton,
  List,
  Filter,
  SimpleForm,
  TextField,
  TextInput
} from "react-admin";

const SectionsFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="match" alwaysOn />
  </Filter>
);

export const SectionsList = ({ ...props }) => (
  <List
    {...props}
    filters={<SectionsFilter />}
    sort={{ field: "name" }}
    perPage={10}
  >
    <Datagrid>
      <TextField source="name" label="resources.section_cn.fields.name" />
      <TextField source="code" label="resources.section_cn.fields.code" />
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

const SectionsTitle = ({ record }) => {
  return record.name;
};

export const SectionsEdit = ({ ...props }) => (
  <Edit title={<SectionsTitle />} {...props}>
    <SimpleForm>
      <TextInput source="name" label="resources.section_cn.fields.name" />
      <TextInput source="code" label="resources.section_cn.fields.code" />
    </SimpleForm>
  </Edit>
);

export const SectionsCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="resources.section_cn.fields.name" />
      <TextInput source="code" label="resources.section_cn.fields.code" />
    </SimpleForm>
  </Create>
);
