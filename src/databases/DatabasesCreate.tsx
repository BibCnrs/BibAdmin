import {
  AutocompleteArrayInput,
  BooleanInput,
  Create,
  ImageField,
  ImageInput,
  ReferenceArrayInput,
  required,
  SimpleForm,
  TextInput,
} from "react-admin";
import { CreateActions } from "../components/Actions";

const DatabasesCreate = () => (
  <Create actions={<CreateActions />} redirect="list">
    <SimpleForm>
      <TextInput
        source="name_fr"
        label="resources.databases.fields.name_fr"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="name_en"
        label="resources.databases.fields.name_en"
        fullWidth
      />
      <TextInput
        source="url_fr"
        label="resources.databases.fields.url_fr"
        validate={required()}
        fullWidth
      />
      <TextInput
        source="url_en"
        label="resources.databases.fields.url_en"
        validate={required()}
        fullWidth
      />
      <TextInput
        multiline
        source="text_fr"
        label="resources.databases.fields.text_fr"
        validate={required()}
        fullWidth
      />
      <TextInput
        multiline
        source="text_en"
        label="resources.databases.fields.text_en"
        validate={required()}
        fullWidth
      />
      <ReferenceArrayInput
        label="resources.institutes.fields.communities"
        source="communities"
        reference="communities"
      >
        <AutocompleteArrayInput
          filterToQuery={(searchText) => ({ name: searchText })}
          optionText="name"
          fullWidth
        />
      </ReferenceArrayInput>
      <ImageInput
        source="image"
        label="resources.databases.fields.image"
        placeholder={<p>Glisser déposer l&apos;image</p>}
        accept="image/*"
      >
        <ImageField
          source="src"
          title="title_database"
          sx={{
            "& .RaImageField-image": {
              width: "auto",
              height: "auto",
              maxWidth: "100%",
            },
          }}
        />
      </ImageInput>
      <BooleanInput
        source="active"
        label="resources.databases.fields.active"
        defaultValue={true}
      />
      <BooleanInput
        source="oa"
        label="resources.databases.fields.open_access"
      />
      <BooleanInput
        source="use_proxy"
        label="resources.databases.fields.use_proxy"
        defaultValue={true}
      />
    </SimpleForm>
  </Create>
);

export default DatabasesCreate;
