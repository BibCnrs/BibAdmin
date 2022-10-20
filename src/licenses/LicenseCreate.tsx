import {
    BooleanInput,
    Create,
    FormTab,
    required,
    TabbedForm,
    TextInput,
} from 'react-admin';
import { CreateActions } from '../components/Actions';
import { RichTextInput } from 'ra-input-rich-text';
import { LicenseCommunities } from './LicenseCommunities';

const LicenseCreate = () => (
    <Create actions={<CreateActions />} redirect="list">
        
        <TabbedForm>
            <FormTab label="General">
                <LicenseCommunities />
                <BooleanInput
                    label="Actif"
                    source="enable"
                    defaultChecked={true}
                    sx={{ marginTop: 4 }}
                />
            </FormTab>

            <FormTab label="Français">
                <TextInput
                    source="name_fr"
                    label="resources.licenses.fields.name"
                    validate={required()}
                />
                <RichTextInput
                    source="content_fr"
                    label="resources.licenses.fields.content"
                    validate={required()}
                />
            </FormTab>

            <FormTab label="Anglais">
                <TextInput
                    source="name_en"
                    label="resources.licenses.fields.name"
                    validate={required()}
                />
                <RichTextInput
                    source="content_en"
                    label="resources.licenses.fields.content"
                    validate={required()}
                />
            </FormTab>
        </TabbedForm>
    </Create>
);

export default LicenseCreate;
