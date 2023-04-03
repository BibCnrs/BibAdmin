import { CreateActions } from '../components/Actions';
import {
    AutocompleteArrayInput,
    Create,
    ReferenceArrayInput,
    required,
    SimpleForm,
    TextInput,
} from 'react-admin';

const FavorisCreate = () => (
    <Create actions={<CreateActions />} redirect="list">
        <SimpleForm>
            <TextInput
                source="title"
                label="resources.revues.fields.title"
                validate={required()}
                fullWidth
            />
            <TextInput
                source="url"
                label="resources.revues.fields.url"
                validate={required()}
                fullWidth
            />

            <ReferenceArrayInput
                label="resources.revues.fields.communities"
                source="communities"
                reference="communities"
            >
                <AutocompleteArrayInput
                    filterToQuery={(searchText) => ({ name: searchText })}
                    optionText="name"
                    fullWidth
                />
            </ReferenceArrayInput>
        </SimpleForm>
    </Create>
);

export default FavorisCreate;
