import {
    BooleanInput,
    Create,
    FileField,
    FileInput,
    SimpleForm,
} from 'react-admin';
import { CreateActions } from '../components/Actions';

import { LicenseCommunities } from './LicenseCommunities';
import { LicenseTab } from './LicenseTab';

const validateLicenseCreation = (values: any) => {
    const errors: any = {};
    if (!values.content_en) {
        errors.content_en = 'ra.validation.required';
    }

    if (!values.name_en) {
        errors.name_en = 'ra.validation.required';
    }

    if (!values.content_fr) {
        errors.content_fr = 'ra.validation.required';
    }

    if (!values.name_fr) {
        errors.name_fr = 'ra.validation.required';
    }

    return errors;
};

const LicenseCreate = () => {
    return (
        <Create actions={<CreateActions />} redirect="list">
            <SimpleForm validate={validateLicenseCreation}>
                <LicenseCommunities />
                <FileInput
                    sx={{ marginTop: 4 }}
                    source="pdf"
                    label="PDF"
                    accept="application/pdf"
                    maxSize={26000000}
                    helperText="Taille maximale 25 Mb"
                >
                    <FileField source="src" title="title" />
                </FileInput>
                <BooleanInput
                    label="Actif"
                    source="enable"
                    sx={{ marginTop: 4 }}
                    defaultValue={true}
                />
                <LicenseTab />
            </SimpleForm>
        </Create>
    );
};

export default LicenseCreate;
