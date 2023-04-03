import { LicenseCommunities } from './LicenseCommunities';
import { EditActions } from '../components/Actions';
import { MultilingualContentTab } from '../components/MultilingualContentTab';
import {
    BooleanInput,
    Edit,
    FileField,
    FileInput,
    SimpleForm,
} from 'react-admin';

const LicenseEdit = () => {
    return (
        <Edit actions={<EditActions />} redirect="list">
            <SimpleForm>
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
                />
                <MultilingualContentTab />
            </SimpleForm>
        </Edit>
    );
};

export default LicenseEdit;
