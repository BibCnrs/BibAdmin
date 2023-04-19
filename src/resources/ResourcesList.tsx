import CustomPagination from '../components/CustomPagination';
import BulkActionButtons from '../components/BulkActionButtons';
import LinkEdit from '../components/LinkEdit';
import Chip from '@mui/material/Chip';
import find from 'lodash/find';
import {
    BooleanField,
    Datagrid,
    DeleteWithConfirmButton,
    EditButton,
    List,
    useGetList,
    useRecordContext,
    WrapperField,
} from 'react-admin';

function InternalChip() {
    const record = useRecordContext();
    const { data: communities } = useGetList('communities');
    const community = find(communities, { id: record?.community })?.name;
    return <Chip label={community ? community : 'Autre'} />;
}

const ResourcesList = () => {
    return (
        <List
            perPage={10}
            pagination={<CustomPagination />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid>
                <LinkEdit
                    source="name_fr"
                    label="resources.ressource.fields.name"
                />
                <BooleanField label="Actif" source="enable" />
                <WrapperField label="Communautés (Couleur de)">
                    <InternalChip />
                </WrapperField>
                <EditButton />
                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    );
};

export default ResourcesList;
