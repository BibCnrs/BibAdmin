import ResourcesHeader from './ResourcesHeader';
import { CreateActions } from '../components/Actions';
import { BooleanInput, Create, SimpleForm, TextInput } from 'react-admin';

const ResourcesCreate = () => {
    return (
        <Create actions={<CreateActions />} redirect="list">
            <SimpleForm>
                <ResourcesHeader />
                <BooleanInput
                    sx={{ marginTop: '15px' }}
                    label="Actif"
                    source="enable"
                    name="enable"
                    options={undefined}
                    defaultValue={true}
                />
                <TextInput
                    label="Lien du fichier"
                    sx={{ width: '100%' }}
                    name="href"
                    source="href"
                />
                <TextInput
                    label="Titre français"
                    sx={{ width: '100%' }}
                    name="name_fr"
                    source="name_fr"
                />
                <TextInput
                    label="Titre anglais"
                    sx={{ width: '100%' }}
                    name="name_en"
                    source="name_en"
                />
            </SimpleForm>
        </Create>
    );
};

export default ResourcesCreate;
