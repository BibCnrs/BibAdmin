import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  BooleanField,
  TextInput,
  LongTextInput,
  BooleanInput,
  FileInput,
  ImageField,
  ReferenceArrayInput,
  SelectArrayInput
} from "react-admin";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";
import ListActions from "../components/ListActions";

const DatabasesFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
  </Filter>
);

export const DatabasesList = ({ ...props }) => (
  <List
    {...props}
    filters={<DatabasesFilter />}
    sort={{ field: "name_fr", order: "ASC" }}
    perPage={10}
  >
    <Datagrid>
      <LinkEdit source="name_fr" label="resources.databases.fields.name_fr" />
      <LinkEdit source="name_en" label="resources.databases.fields.name_en" />
      <BooleanField source="active" label="resources.databases.fields.active" />
      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const DatabasesTitle = ({ record }) => {
  return record.name_fr;
};

export const DatabasesEdit = ({ ...props }) => (
  <Edit title={<DatabasesTitle />} {...props} actions={<ListActions />}>
    <SimpleForm>
      <TextInput source="name_fr" label="resources.databases.fields.name_fr" />
      <TextInput source="name_en" label="resources.databases.fields.name_en" />
      <TextInput source="url_fr" label="resources.databases.fields.url_fr" />
      <TextInput source="url_en" label="resources.databases.fields.url_en" />
      <LongTextInput source="text_fr" label="resources.databases.fields.text_fr" />
      <LongTextInput source="text_en" label="resources.databases.fields.text_en" />
      <ReferenceArrayInput
        label="resources.databases.fields.communities"
        source="communities"
        reference="communities"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <FileInput
        source="image"
        label="resources.databases.fields.image"
        placeholder={<p>Glisser déposer l'image</p>}
      >
        <ImageField source="image" title="title_database" />
      </FileInput>
      <ImageField source="image" label="Image actuel" title="current_image" />
      <BooleanInput source="active" label="resources.databases.fields.active" />
    </SimpleForm>
  </Edit>
);

export const DatabasesCreate = ({ ...props }) => (
  <Create {...props} actions={<ListActions />}>
    <SimpleForm redirect="list">
      <TextInput source="name_fr" label="resources.databases.fields.name_fr" />
      <TextInput source="name_en" label="resources.databases.fields.name_en" />
      <TextInput source="url_fr" label="resources.databases.fields.url_fr" />
      <TextInput source="url_en" label="resources.databases.fields.url_en" />
      <LongTextInput source="text_fr" label="resources.databases.fields.text_fr" />
      <LongTextInput source="text_en" label="resources.databases.fields.text_en" />
      <ReferenceArrayInput
        label="resources.databases.fields.communities"
        source="communities"
        reference="communities"
        className="tags"
      >
        <SelectArrayInput optionText="name" />
      </ReferenceArrayInput>
      <FileInput
        source="image"
        label="resources.databases.fields.image"
        placeholder={<p>Glisser déposer l'image</p>}
      >
        <ImageField source="image" title="title_database" />
      </FileInput>
      <BooleanInput source="active" label="resources.databases.fields.active" />
    </SimpleForm>
  </Create>
);
