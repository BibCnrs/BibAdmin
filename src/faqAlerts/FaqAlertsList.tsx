import { pages } from './FaqAlertsHeader';
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
} from 'react-admin';
import find from 'lodash/find';
import Chip from '@mui/material/Chip';

function InternalChip() {
    const record = useRecordContext();
    return <Chip label={find(pages, { id: record?.page })?.name} />;
}

export default function FaqAlertsList() {
    return (
        <List
            perPage={10}
            pagination={<CustomPagination />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid>
                <LinkEdit
                    source="name_fr"
                    label="resources.faqAlerts.fields.name"
                />
                <BooleanField label="Actif" source="enable" />
                <WrapperField label="Page">
                    <InternalChip />
                </WrapperField>
                <DateField source="from" label="Date début" />
                <DateField source="to" label="Date fin" />
                <EditButton />
                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    );
}
