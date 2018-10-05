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
  ReferenceArrayField,
  SingleFieldList,
  ChipField,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput
} from "react-admin";

const InstitutsFilter = props => (
  <Filter {...props}>
    <TextInput label="Search" source="match" alwaysOn />
    <TextInput label="Nom" source="name" />
    <TextInput label="Code" source="code" />
  </Filter>
);

export const InstitutsList = ({ ...props }) => (
  <List
    {...props}
    filters={<InstitutsFilter />}
    sort={{ field: "code" }}
    perPage={10}
  >
    <Datagrid>
      <TextField source="id" label="resources.institutes.fields.id" />
      <TextField source="code" label="resources.institutes.fields.code" />
      <TextField source="name" label="resources.institutes.fields.name" />
      <ReferenceArrayField
        label="resources.institutes.fields.communities"
        reference="communities"
        source="communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

const InstitutsTitle = ({ record }) => {
  return record.name;
};

export const InstitutsEdit = ({ ...props }) => (
  <Edit title={<InstitutsTitle />} {...props}>
    <SimpleForm>
      <TextInput source="id" label="resources.institutes.fields.id" />
      <TextInput source="code" label="resources.institutes.fields.code" />
      <TextInput source="name" label="resources.institutes.fields.name" />
      <ReferenceArrayInput
        label="resources.institutes.fields.communities"
        reference="communities"
        source="communities"
      >
        <SelectArrayInput source="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const InstitutsCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="id" label="resources.institutes.fields.id" />
      <TextInput source="code" label="resources.institutes.fields.code" />
      <TextInput source="name" label="resources.institutes.fields.name" />
      <ReferenceArrayInput
        label="resources.institutes.fields.communities"
        reference="communities"
        source="communities"
      >
        <SelectArrayInput source="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
