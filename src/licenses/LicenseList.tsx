import {
    ArrayField,
    BooleanField,
    BulkDeleteWithConfirmButton,
    ChipField,
    Datagrid,
    DeleteWithConfirmButton,
    EditButton,
    FunctionField,
    List,
    SingleFieldList,
    TextField,
    useDataProvider,
    useListContext,
    useNotify,
    useRefresh,
} from 'react-admin';
import CustomPagination from '../components/CustomPagination';
import LinkEdit from '../components/LinkEdit';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { Box, Button, Tooltip } from '@mui/material';
import { useMutation } from 'react-query';

const BulkActionLicensesButtons = () => {
    const { selectedIds } = useListContext();
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const refresh = useRefresh();
    const { mutate } = useMutation(
        ['setCommonLicense', selectedIds[0]],
        () => dataProvider.setCommonLicense(selectedIds[0]),
        {
            onSuccess: (data) => {
                refresh();
                notify('License commune mise à jour', { type: 'success' });
            },
            onError: (error: any) => {
                notify(`License commune non mise à jour: ${error.message}`, {
                    type: 'warning',
                });
            },
        },
    );
    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {selectedIds.length === 1 && (
                    <Button
                        onClick={() => mutate()}
                        sx={{ mr: '2rem' }}
                        startIcon={<LocalPoliceIcon />}
                    >
                        Utiliser comme licence commune
                    </Button>
                )}
                <BulkDeleteWithConfirmButton mutationMode="undoable" />
            </Box>
        </>
    );
};

const LicenseList = () => (
    <List
        perPage={10}
        pagination={<CustomPagination />}
        bulkActionButtons={<BulkActionLicensesButtons />}
    >
        <Datagrid>
            <LinkEdit source="name_fr" label="resources.licenses.fields.name" />
            <TextField
                source="pdf.title"
                label="resources.licenses.fields.pdf"
                emptyText="-"
            />
            <ArrayField
                source="license_community"
                label="resources.licenses.fields.communities"
                sortable={false}
            >
                <SingleFieldList>
                    <ChipField source="community.name" emptyText="-" />
                </SingleFieldList>
            </ArrayField>
            <BooleanField label="Actif" source="enable" />
            <EditButton />
            <DeleteWithConfirmButton />
            <FunctionField
                render={(record: any) =>
                    record.common && (
                        <Tooltip title="License Commune">
                            <LocalPoliceIcon />
                        </Tooltip>
                    )
                }
            />
        </Datagrid>
    </List>
);

export default LicenseList;
