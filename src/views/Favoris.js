import React from "react";
import {
  Create,
  Datagrid,
  Edit,
  EditButton,
  List,
  Filter,
  SimpleForm,
  SingleFieldList,
  TextInput,
  ReferenceArrayInput,
  SelectArrayInput,
  ReferenceArrayField,
  ChipField
} from "react-admin";
import DeleteButtonWithConfirmation from "../components/DeleteButtonWithConfirmation";
import LinkEdit from "../components/LinkEdit";

const FavorisFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
    <TextInput source="title" label="resources.revues.fields.title" />

    <ReferenceArrayInput
      label="resources.revues.fields.communities"
      reference="communities"
      source="communities"
    >
      <SelectArrayInput>
        <ChipField source="name" />
      </SelectArrayInput>
    </ReferenceArrayInput>
  </Filter>
);

export const FavorisList = ({ ...props }) => (
  <List {...props} filters={<FavorisFilter />} perPage={10}>
    <Datagrid>
      <LinkEdit source="title" label="resources.revues.fields.title" />

      <ReferenceArrayField
        label="resources.revues.fields.communities"
        reference="communities"
        source="communities"
      >
        <SingleFieldList>
          <ChipField source="name" />
        </SingleFieldList>
      </ReferenceArrayField>

      <EditButton />
      <DeleteButtonWithConfirmation />
    </Datagrid>
  </List>
);

const FavorisTitle = ({ record }) => {
  return record.title;
};

export const FavorisEdit = ({ ...props }) => (
  <Edit title={<FavorisTitle />} {...props}>
    <SimpleForm>
      <TextInput source="title" label="resources.revues.fields.title" />
      <TextInput source="url" label="resources.revues.fields.url" />

      <ReferenceArrayInput
        label="resources.revues.fields.communities"
        reference="communities"
        source="communities"
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>
    </SimpleForm>
  </Edit>
);

export const FavorisCreate = ({ ...props }) => (
  <Create {...props}>
    <SimpleForm redirect="list">
      <TextInput source="title" label="resources.revues.fields.title" />
      <TextInput source="url" label="resources.revues.fields.url" />

      <ReferenceArrayInput
        label="resources.revues.fields.communities"
        reference="communities"
        source="communities"
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>
    </SimpleForm>
  </Create>
);
