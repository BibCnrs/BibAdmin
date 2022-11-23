import {
    AutocompleteInput,
    BooleanField,
    BooleanInput,
    ChipField,
    Datagrid,
    DateField,
    DateInput,
    DeleteWithConfirmButton,
    downloadCSV,
    EditButton,
    ExportButton,
    FilterButton,
    List,
    RaRecord,
    ReferenceArrayField,
    ReferenceField,
    ReferenceInput,
    SingleFieldList,
    TextField,
    TextInput,
    TopToolbar,
} from 'react-admin';
import { renameKeys } from '../utils/renameKeys';
import jsonExport from 'jsonexport/dist';
import CustomPagination from '../components/CustomPagination';
import BulkActionButtons from '../components/BulkActionButtons';
import LinkEdit from '../components/LinkEdit';

const JanusFilter = [
    <TextInput label="Rechercher" source="match" alwaysOn />,
    <TextInput source="uid" label="resources.janusAccounts.fields.uid" />,

    <TextInput
        type="email"
        source="mail"
        label="resources.janusAccounts.fields.mail"
    />,

    <ReferenceInput
        label="resources.janusAccounts.fields.primary_institute"
        source="primary_institute"
        reference="institutes"
    >
        <AutocompleteInput
            filterToQuery={(searchText) => ({ name: searchText })}
            optionText="name"
            label="resources.janusAccounts.fields.primary_institute"
        />
    </ReferenceInput>,
    <ReferenceInput
        label="resources.janusAccounts.fields.primary_unit"
        source="primary_unit"
        reference="units"
    >
        <AutocompleteInput
            filterToQuery={(searchText) => ({ code: searchText })}
            optionText="code"
            label="resources.janusAccounts.fields.primary_unit"
        />
    </ReferenceInput>,
    <ReferenceInput
        label="resources.janusAccounts.fields.additional_units"
        source="janus_account_unit.unit_id"
        reference="units"
    >
        <AutocompleteInput
            filterToQuery={(searchText) => ({
                code: searchText,
            })}
            optionText="code"
            label="resources.janusAccounts.fields.additional_units"
        />
    </ReferenceInput>,
    <ReferenceInput
        label="resources.janusAccounts.fields.communities"
        source="janus_account_community.community_id"
        reference="communities"
    >
        <AutocompleteInput
            filterToQuery={(searchText) => ({
                name: searchText,
            })}
            optionText="name"
            label="resources.janusAccounts.fields.communities"
        />
    </ReferenceInput>,
    <DateInput
        source="last_connexion_lte"
        label="resources.janusAccounts.fields.last_connexion_before"
    />,

    <DateInput
        source="last_connexion_gte"
        label="resources.janusAccounts.fields.last_connexion_after"
    />,
    <DateInput
        source="first_connexion_lte"
        label="resources.janusAccounts.fields.first_connexion_before"
    />,
    <DateInput
        source="first_connexion_gte"
        label="resources.janusAccounts.fields.first_connexion_after"
    />,

    <BooleanInput source="cnrs" label="resources.janusAccounts.fields.cnrs" />,
    <BooleanInput
        source="active"
        label="resources.janusAccounts.fields.active"
    />,
];

const exporter = async (records: RaRecord[]) => {
    const data = records.map((record) => renameKeys(record, 'janusAccounts'));
    jsonExport(data, { rowDelimiter: ';' }, (err, csv) => {
        downloadCSV(csv, 'janusAccounts');
    });
};

const ListActions = (props: any) => (
    <TopToolbar>
        <FilterButton />
        <ExportButton maxResults={100000} />
    </TopToolbar>
);

const JanusList = () => (
    <List
        filters={JanusFilter}
        perPage={10}
        pagination={<CustomPagination />}
        exporter={exporter}
        bulkActionButtons={<BulkActionButtons />}
        actions={<ListActions />}
    >
        <Datagrid>
            <LinkEdit source="uid" label="resources.janusAccounts.fields.uid" />
            <LinkEdit
                source="mail"
                label="resources.janusAccounts.fields.mail"
            />

            <ReferenceField
                label="resources.janusAccounts.fields.primary_institute"
                source="primary_institute"
                reference="institutes"
                sortBy="institute.name"
            >
                <TextField source="name" />
            </ReferenceField>

            <ReferenceArrayField
                label="resources.janusAccounts.fields.additional_institutes"
                reference="institutes"
                source="additional_institutes"
                sortable={false}
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>

            <ReferenceField
                label="resources.janusAccounts.fields.primary_unit"
                source="primary_unit"
                reference="units"
                sortBy="unit.code"
            >
                <TextField source="code" />
            </ReferenceField>

            <ReferenceArrayField
                label="resources.janusAccounts.fields.all_communities"
                reference="communities"
                source="all_communities"
                sortable={false}
            >
                <SingleFieldList>
                    <ChipField source="name" />
                </SingleFieldList>
            </ReferenceArrayField>

            <DateField
                source="last_connexion"
                label="resources.janusAccounts.fields.last_connexion"
            />
            <DateField
                source="first_connexion"
                label="resources.janusAccounts.fields.first_connexion"
            />
            <BooleanField
                source="active"
                label="resources.janusAccounts.fields.active"
            />
            <EditButton />
            <DeleteWithConfirmButton />
        </Datagrid>
    </List>
);

export default JanusList;
