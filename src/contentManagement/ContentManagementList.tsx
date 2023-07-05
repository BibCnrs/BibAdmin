import { pages } from './ContentManagementHeader';
import CustomPagination from '../components/CustomPagination';
import BulkActionButtons from '../components/BulkActionButtons';
import LinkEdit from '../components/LinkEdit';
import {
    BooleanField,
    Datagrid,
    DeleteWithConfirmButton,
    EditButton,
    List,
    WrapperField,
    useRecordContext,
    DateField,
    TextInput,
    SelectInput,
} from 'react-admin';
import find from 'lodash/find';
import Chip from '@mui/material/Chip';

function InternalChip() {
    const record = useRecordContext();
    return <Chip label={find(pages, { id: record?.page })?.name} />;
}

const ContentManagementFilter = [
    <TextInput label="Rechercher" source="name_fr" alwaysOn />,
    <SelectInput source="page" choices={pages} />,
];

export default function ContentManagementList() {
    return (
        <List
            filters={ContentManagementFilter}
            perPage={10}
            pagination={<CustomPagination />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid>
                <LinkEdit
                    source="name_fr"
                    label="resources.contentManagement.fields.name"
                />
                <BooleanField label="Actif" source="enable" />
                <WrapperField label="Page">
                    <InternalChip />
                </WrapperField>
                <DateField source="from" label="Date début" />
                <DateField source="to" emptyText="-" label="Date fin" />
                <EditButton />
                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    );
}
