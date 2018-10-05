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
  TextInput,
  LongTextInput,
  ReferenceArrayInput,
  SelectArrayInput
} from "react-admin";

const SectionsFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput source="name" label="resources.section_cn.fields.name" />
    <TextInput source="code" label="resources.section_cn.fields.code" />
    <LongTextInput
      source="comment"
      label="resources.section_cn.fields.comment"
    />
    <ReferenceArrayInput
      label="resources.section_cn.fields.primary_institutes"
      source="primary_institutes"
      reference="institutes"
      className="tags"
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
    <ReferenceArrayInput
      label="resources.section_cn.fields.secondary_institutes"
      source="secondary_institutes"
      reference="institutes"
    >
      <SelectArrayInput optionText="name" />
    </ReferenceArrayInput>
  </Filter>
);

export const SectionsList = ({ ...props }) => (
  <List {...props} filters={<SectionsFilter />} perPage={10}>
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
  <Edit title={<SectionsTitle />} {...props} redirect="list">
    <SimpleForm>
      <TextInput source="name" label="resources.section_cn.fields.name" />
      <TextInput source="code" label="resources.section_cn.fields.code" />
      <LongTextInput
        source="comment"
        label="resources.section_cn.fields.comment"
      />
      <ReferenceArrayInput
        label="resources.section_cn.fields.primary_institutes"
        source="primary_institutes"
        reference="institutes"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="resources.section_cn.fields.secondary_institutes"
        source="secondary_institutes"
        reference="institutes"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const SectionsCreate = ({ ...props }) => (
  <Create {...props} redirect="list">
    <SimpleForm>
      <TextInput source="name" label="resources.section_cn.fields.name" />
      <TextInput source="code" label="resources.section_cn.fields.code" />
      <LongTextInput
        source="comment"
        label="resources.section_cn.fields.comment"
      />
      <ReferenceArrayInput
        label="resources.section_cn.fields.primary_institutes"
        source="primary_institutes"
        reference="institutes"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <ReferenceArrayInput
        label="resources.section_cn.fields.secondary_institutes"
        source="secondary_institutes"
        reference="institutes"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
