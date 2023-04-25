import { pages } from './TestsNewsHeader';
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
    TextField,
    SingleFieldList,
    ChipField,
    ArrayField,
} from 'react-admin';
import find from 'lodash/find';
import Chip from '@mui/material/Chip';

function InternalChip() {
    const record = useRecordContext();
    return <Chip label={find(pages, { id: record?.page })?.name} />;
}

export default function TestsNewsList() {
    return (
        <List
            perPage={10}
            pagination={<CustomPagination />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid>
                <LinkEdit source="name_fr" label="Nom" />
                <BooleanField label="Actif" source="enable" />
                <WrapperField label="Page">
                    <InternalChip />
                </WrapperField>
                <ArrayField source="domains" label="Domains" sortable={false}>
                    <SingleFieldList>
                        <ChipField emptyText="-" />
                    </SingleFieldList>
                </ArrayField>
                <TextField source="page" label="Page (nom technique)" />
                <DateField source="from" label="Date début" />
                <DateField source="to" label="Date fin" />
                <EditButton />
                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    );
}
