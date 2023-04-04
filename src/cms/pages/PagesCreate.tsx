import { CreateActions } from '../../components/Actions';
import {
    MultilingualContentTab,
    validateMultilingualContentCreation,
} from '../../components/MultilingualContentTab';
import CMSPages from '../CMSPages';
import { BooleanInput, Create, SimpleForm } from 'react-admin';

const PagesCreate = () => {
    return (
        <Create actions={<CreateActions />} redirect="list">
            <SimpleForm validate={validateMultilingualContentCreation}>
                <CMSPages />
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

export default PagesCreate;
