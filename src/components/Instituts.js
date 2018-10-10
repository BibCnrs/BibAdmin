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
  ReferenceField,
  ReferenceArrayInput,
  SelectArrayInput
} from "react-admin";

const InstitutsFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput source="id" label="resources.institutes.fields.id" />
    <TextInput
      source="like_institute.code"
      label="resources.institutes.fields.code"
    />
    <TextInput
      source="like_institute.name"
      label="resources.institutes.fields.name"
    />
    <ReferenceArrayInput
      label="resources.institutes.fields.communities"
      reference="communities"
      source="communities"
    >
      <SelectArrayInput source="name" />
    </ReferenceArrayInput>
  </Filter>
);

export const InstitutsList = ({ ...props }) => (
  <List {...props} filters={<InstitutsFilter />} perPage={50}>
    <Datagrid>
      <TextField source="id" label="resources.institutes.fields.id" />
      <ReferenceField
        label="resources.institutes.fields.code"
        source="id"
        reference="institutes"
      >
        <TextField source="code" />
      </ReferenceField>
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
        className="tags"
      >
        <SelectArrayInput source="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const InstitutsCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="id" label="resources.institutes.fields.id" />
      <TextInput source="code" label="resources.institutes.fields.code" />
      <TextInput source="name" label="resources.institutes.fields.name" />
      <ReferenceArrayInput
        label="resources.institutes.fields.communities"
        reference="communities"
        source="communities"
        className="tags"
      >
        <SelectArrayInput source="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
