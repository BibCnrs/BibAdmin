import { EditActions } from '../../components/Actions';
import { MultilingualContentTab } from '../../components/MultilingualContentTab';
import { BooleanInput, Edit, SimpleForm } from 'react-admin';

const LegalEdit = () => {
    return (
        <Edit actions={<EditActions />} redirect="list">
            <SimpleForm>
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

export default LegalEdit;
