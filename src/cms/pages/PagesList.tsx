import CustomPagination from '../../components/CustomPagination';
import BulkActionButtons from '../../components/BulkActionButtons';
import LinkEdit from '../../components/LinkEdit';
import {
    BooleanField,
    Datagrid,
    DeleteWithConfirmButton,
    EditButton,
    List,
} from 'react-admin';

const PagesList = () => (
    <List
        perPage={10}
        pagination={<CustomPagination />}
        bulkActionButtons={<BulkActionButtons />}
    >
        <Datagrid>
            <LinkEdit
                source="name_fr"
                label="resources.cms.pages.fields.name"
            />
            <BooleanField label="Actif" source="enable" />
            <EditButton />
            <DeleteWithConfirmButton />
        </Datagrid>
    </List>
);

export default PagesList;
