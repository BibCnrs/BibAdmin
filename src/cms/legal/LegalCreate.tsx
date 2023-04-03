import { CreateActions } from '../../components/Actions';
import {
    MultilingualContentTab,
    validateMultilingualContentCreation,
} from '../../components/MultilingualContentTab';
import { BooleanInput, Create, SimpleForm } from 'react-admin';

const LegalList = () => {
    return (
        <Create actions={<CreateActions />} redirect="list">
            <SimpleForm validate={validateMultilingualContentCreation}>
                <BooleanInput
                    label="Actif"
                    source="enable"
                    sx={{ marginTop: 4 }}
                    defaultValue={true}
                />
                <MultilingualContentTab />
            </SimpleForm>
        </Create>
    );
};

export default LegalList;
