import {
    BooleanInput,
    Edit,
    FileField,
    FileInput,
    FormTab,
    required,
    TabbedForm,
    TextInput,
} from 'react-admin';
import { EditActions } from '../components/Actions';
import { RichTextInput } from 'ra-input-rich-text';
import { LicenseCommunities } from './LicenseCommunities';

const LicenseEdit = () => (
    <Edit actions={<EditActions />} redirect="list">
        <TabbedForm>
            <FormTab label="General">
                <LicenseCommunities />
                <FileInput
                    sx={{ marginTop: 4 }}
                    source="pdf"
                    label="PDF"
                    accept="application/pdf"
                >
                    <FileField source="src" title="title" />
                </FileInput>
                <BooleanInput
                    label="Actif"
                    source="enable"
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
    </Edit>
);

export default LicenseEdit;
