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
  ReferenceField,
  ReferenceArrayField,
  SingleFieldList,
  BooleanField,
  ChipField,
  TextInput,
  NumberInput,
  BooleanInput,
  ReferenceInput,
  ReferenceArrayInput,
  SelectInput,
  SelectArrayInput,
  LongTextInput
} from "react-admin";

const UnitsFilter = props => (
  <Filter {...props}>
    <TextInput label="Rechercher" source="match" alwaysOn />
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
      source="correspondant_documentaire"
      label="resources.units.fields.correspondant_informatique"
    />
    <TextInput source="ci_phone" label="resources.units.fields.ci_phone" />
    <TextInput
      type="email"
      source="ci_mail"
      label="resources.units.fields.ci_mail"
    />

    <ReferenceInput
      label="resources.units.fields.main_institute"
      source="main_institute"
      reference="institutes"
    >
      <SelectInput source="name" />
    </ReferenceInput>

    <ReferenceArrayInput
      label="resources.units.fields.institutes"
      reference="institutes"
      source="institutes"
    >
      <SelectArrayInput>
        <ChipField source="name" />
      </SelectArrayInput>
    </ReferenceArrayInput>

    <ReferenceArrayInput
      label="resources.units.fields.communities"
      reference="communities"
      source="communities"
    >
      <SelectArrayInput>
        <ChipField source="name" />
      </SelectArrayInput>
    </ReferenceArrayInput>

    <ReferenceArrayInput
      label="resources.units.fields.section_cn"
      reference="section_cn"
      source="sections_cn"
    >
      <SelectArrayInput>
        <ChipField source="code" />
      </SelectArrayInput>
    </ReferenceArrayInput>

    <BooleanInput
      source="active"
      label="resources.inistAccounts.fields.active"
    />
  </Filter>
);

export const UnitsList = ({ ...props }) => (
  <List {...props} filters={<UnitsFilter />} perPage={10}>
    <Datagrid>
      <TextField source="code" label="resources.units.fields.code" />
      <TextField source="name" label="resources.units.fields.name" />

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

      <TextField
        source="nb_inist_account"
        label="resources.units.fields.nb_inist_account"
      />
      <TextField
        source="nb_janus_account"
        label="resources.units.fields.nb_janus_account"
      />

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
      <EditButton label="" />
      <DeleteButton label="" />
    </Datagrid>
  </List>
);

const UnitsTitle = ({ record }) => {
  return record.name;
};

export const UnitsEdit = ({ ...props }) => (
  <Edit title={<UnitsTitle />} {...props}>
    <SimpleForm>
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
        source="correspondant_documentaire"
        label="resources.units.fields.correspondant_informatique"
      />
      <TextInput source="ci_phone" label="resources.units.fields.ci_phone" />
      <TextInput
        type="email"
        source="ci_mail"
        label="resources.units.fields.ci_mail"
      />

      <ReferenceInput
        label="resources.units.fields.main_institute"
        source="main_institute"
        reference="institutes"
      >
        <SelectInput source="name" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.units.fields.institutes"
        reference="institutes"
        source="institutes"
        className="tags"
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>

      <TextField
        source="nb_inist_account"
        label="resources.units.fields.nb_inist_account"
      />
      <TextField
        source="nb_janus_account"
        label="resources.units.fields.nb_janus_account"
      />

      <ReferenceArrayInput
        label="resources.units.fields.communities"
        reference="communities"
        source="communities"
        className="tags"
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.units.fields.section_cn"
        reference="section_cn"
        source="sections_cn"
        className="tags"
      >
        <SelectArrayInput>
          <ChipField source="code" />
        </SelectArrayInput>
      </ReferenceArrayInput>

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
  <Create {...props} redirect="list">
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
        source="correspondant_documentaire"
        label="resources.units.fields.correspondant_informatique"
      />
      <TextInput source="ci_phone" label="resources.units.fields.ci_phone" />
      <TextInput
        type="email"
        source="ci_mail"
        label="resources.units.fields.ci_mail"
      />

      <ReferenceInput
        label="resources.units.fields.main_institute"
        source="main_institute"
        reference="institutes"
      >
        <SelectInput source="name" />
      </ReferenceInput>

      <ReferenceArrayInput
        label="resources.units.fields.institutes"
        reference="institutes"
        source="institutes"
        className="tags"
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>

      <TextField
        source="nb_inist_account"
        label="resources.units.fields.nb_inist_account"
      />
      <TextField
        source="nb_janus_account"
        label="resources.units.fields.nb_janus_account"
      />

      <ReferenceArrayInput
        label="resources.units.fields.communities"
        reference="communities"
        source="communities"
        className="tags"
      >
        <SelectArrayInput>
          <ChipField source="name" />
        </SelectArrayInput>
      </ReferenceArrayInput>

      <ReferenceArrayInput
        label="resources.units.fields.section_cn"
        reference="section_cn"
        source="sections_cn"
      >
        <SelectArrayInput>
          <ChipField source="code" />
        </SelectArrayInput>
      </ReferenceArrayInput>

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
