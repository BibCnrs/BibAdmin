import { LicenseCommunities } from './LicenseCommunities';
import { EditActions } from '../components/Actions';
import {
    BooleanInput,
    Edit,
    FileField,
    FileInput,
    required,
    SimpleForm,
    TextInput,
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { useState, SyntheticEvent } from 'react';

const TabPanel = (props: any) => {
    const { children, valueTab, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={valueTab !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',

                '& .ra-input-content_fr, & .ra-input-content_en': {
                    minHeight: '400px',
                },
                '& .RaRichTextInputToolbar-root': {
                    minHeight: '40px',
                },
                '& .RaRichTextInput-editorContent': {
                    minHeight: '100px',
                    '.ProseMirror': {
                        minHeight: '400px',
                    },
                },
            }}
            {...other}
        >
            {valueTab === index && children}
        </Box>
    );
};

const LicenseEdit = () => {
    const [valueTab, setValueTab] = useState(0);

    const handleChange = (event: SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
    };

    return (
        <Edit actions={<EditActions />} redirect="list">
            <SimpleForm>
                <LicenseCommunities />
                <FileInput
                    sx={{ marginTop: 4 }}
                    source="pdf"
                    label="PDF"
                    accept="application/pdf"
                    maxSize={26000000}
                    helperText="Taille maximale 25 Mb"
                >
                    <FileField source="src" title="title" />
                </FileInput>
                <BooleanInput
                    label="Actif"
                    source="enable"
                    sx={{ marginTop: 4 }}
                />
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={valueTab}
                        onChange={handleChange}
                        aria-label="language tabs"
                    >
                        <Tab label="Français" />
                        <Tab label="Anglais" />
                    </Tabs>
                </Box>
                <TabPanel valueTab={valueTab} index={0}>
                    <TextInput
                        source="name_fr"
                        label="resources.licenses.fields.name"
                        validate={required()}
                    />
                    <RichTextInput
                        source="content_fr"
                        label="resources.licenses.fields.content"
                        validate={required()}
                    />
                </TabPanel>
                <TabPanel valueTab={valueTab} index={1}>
                    <TextInput
                        source="name_en"
                        label="resources.licenses.fields.name"
                        validate={required()}
                    />
                    <RichTextInput
                        source="content_en"
                        label="resources.licenses.fields.content"
                        validate={required()}
                    />
                </TabPanel>
            </SimpleForm>
        </Edit>
    );
};

export default LicenseEdit;
