import {
    ArrayField,
    BooleanField,
    ChipField,
    Datagrid,
    DeleteWithConfirmButton,
    EditButton,
    List,
    SingleFieldList,
    TextField,
} from 'react-admin';
import BulkActionButtons from '../components/BulkActionButtons';
import CustomPagination from '../components/CustomPagination';
import LinkEdit from '../components/LinkEdit';

const LicenseList = () => (
    <List
        perPage={10}
        pagination={<CustomPagination />}
        bulkActionButtons={<BulkActionButtons />}
    >
        <Datagrid>
            <LinkEdit source="id" label="resources.licenses.fields.id" />
            <LinkEdit source="name_fr" label="resources.licenses.fields.name" />
            <TextField source="pdf.title" label="resources.licenses.fields.pdf" emptyText='-' />
            <ArrayField
                source="license_community"
                label="resources.licenses.fields.communities"
                sortable={false}
            >
                <SingleFieldList>
                    <ChipField source="community.name" emptyText='-' />
                </SingleFieldList>
            </ArrayField>
            <BooleanField source="enable" />
            <EditButton />
            <DeleteWithConfirmButton />
        </Datagrid>
    </List>
);

export default LicenseList;
