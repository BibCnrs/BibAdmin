import CustomPagination from '../components/CustomPagination';
import BulkActionButtons from '../components/BulkActionButtons';
import {
    Datagrid,
    DeleteWithConfirmButton,
    List,
    TextField,
    UrlField,
} from 'react-admin';

export default function MediasList() {
    return (
        <List
            perPage={10}
            pagination={<CustomPagination />}
            bulkActionButtons={<BulkActionButtons />}
        >
            <Datagrid>
                <TextField source="name" label="resources.medias.fields.name" />
                <TextField
                    source="file_name"
                    label="resources.medias.fields.fileName"
                />
                <UrlField
                    source="url"
                    label="resources.medias.fields.url"
                    target="_blank"
                />
                <DeleteWithConfirmButton />
            </Datagrid>
        </List>
    );
}
