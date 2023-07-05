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
    TextInput,
    SelectInput,
} from 'react-admin';
import find from 'lodash/find';
import Chip from '@mui/material/Chip';

const InternalChip = () => {
    const record = useRecordContext();
    return <Chip label={find(pages, { id: record?.page })?.name} />;
};

const DomainsField = () => {
    const record = useRecordContext();
    if (record?.domains && record.domains.length !== 0) {
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

const TestsNewsFilter = [
    <TextInput label="Rechercher" source="name_fr" alwaysOn />,
    <SelectInput source="page" choices={pages} />,
    // <ReferenceInput
    //     label="resources.revues.fields.communities"
    //     source="domain"
    //     reference="communities"
    // >
    //     <AutocompleteInput
    //         filterToQuery={(searchText) => ({ name: searchText })}
    //         optionText="name"
    //         label="resources.revues.fields.communities"
    //     />
    // </ReferenceInput>,
];
export default function TestsNewsList() {
    return (
        <List
            filters={TestsNewsFilter}
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
                <DateField source="from" label="Date début" />
                <DateField source="to" emptyText="-" label="Date fin" />
                <EditButton />
                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    );
}
