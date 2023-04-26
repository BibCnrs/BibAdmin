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
    ArrayField,
} from 'react-admin';
import find from 'lodash/find';
import Chip from '@mui/material/Chip';

const InternalChip = () => {
    const record = useRecordContext();
    return <Chip label={find(pages, { id: record?.page })?.name} />;
};

const DomainsField = () => {
    const record = useRecordContext();
    if (record?.domains) {
        const domains = record.domains as string[];
        return (
            <>
                {domains.map((domain) => (
                    <Chip label={domain} />
                ))}
            </>
        );
    }
    return <Chip label="Common" />;
};

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
                <WrapperField label="Domains">
                    <DomainsField />
                </WrapperField>
                <ArrayField source="tags">
                    <SingleFieldList>
                        <DomainsField />
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
