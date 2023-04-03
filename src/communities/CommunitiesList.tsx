import BulkActionButtons from '../components/BulkActionButtons';
import CustomPagination from '../components/CustomPagination';
import LinkEdit from '../components/LinkEdit';
import { renameKeys } from '../utils/renameKeys';
import { ListActions } from '../components/Actions';
import jsonExport from 'jsonexport/dist';
import {
    BooleanField,
    BooleanInput,
    Datagrid,
    DeleteWithConfirmButton,
    downloadCSV,
    EditButton,
    List,
    RaRecord,
    TextField,
    TextInput,
} from 'react-admin';

const CommunitiesFilter = [
    <TextInput label="Rechercher" source="match" alwaysOn />,
    <TextInput source="gate" label="resources.communities.fields.gate" />,
    <TextInput source="user_id" label="resources.communities.fields.user_id" />,
    <TextInput
        source="password"
        label="resources.communities.fields.password"
    />,
    <TextInput source="profile" label="resources.communities.fields.profile" />,
    <BooleanInput source="ebsco" label="resources.communities.fields.ebsco" />,
];

const exporter = async (records: RaRecord[]) => {
    const data = records.map((record) => renameKeys(record, 'communities'));
    jsonExport(data, { rowDelimiter: ';' }, (err, csv) => {
        downloadCSV(csv, 'communities');
    });
};

const CommunitiesList = () => (
    <List
        filters={CommunitiesFilter}
        perPage={10}
        pagination={<CustomPagination />}
        exporter={exporter}
        bulkActionButtons={<BulkActionButtons />}
        actions={<ListActions />}
    >
        <Datagrid>
            <LinkEdit source="name" label="resources.communities.fields.name" />

            <TextField
                source="gate"
                label="resources.communities.fields.gate"
            />
            <TextField
                source="user_id"
                label="resources.communities.fields.user_id"
            />
            <TextField
                source="profile"
                label="resources.communities.fields.profile"
            />
            <BooleanField
                source="ebsco"
                label="resources.communities.fields.ebsco"
            />
            <EditButton />
            <DeleteWithConfirmButton />
        </Datagrid>
    </List>
);

export default CommunitiesList;
