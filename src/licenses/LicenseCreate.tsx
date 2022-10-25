import {
    BooleanInput,
    Create,
    FileField,
    FileInput,
    required,
    SimpleForm,
    TextInput,
} from 'react-admin';
import { CreateActions } from '../components/Actions';
import { RichTextInput } from 'ra-input-rich-text';
import { Box, Tab, Tabs } from '@mui/material';
import { LicenseCommunities } from './LicenseCommunities';
import { useState } from 'react';

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

const LicenseCreate = () => {
    const [valueTab, setValueTab] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
    };
    return (
        <Create actions={<CreateActions />} redirect="list">
            <SimpleForm>
                <LicenseCommunities />
                <FileInput
                    sx={{ marginTop: 4 }}
                    source="pdf"
                    label="PDF"
                    accept="application/pdf"
                >
                    <FileField source="src" title="title" />
                </FileInput>
                <BooleanInput
                    label="Actif"
                    source="enable"
                    sx={{ marginTop: 4 }}
                    defaultValue={true}

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
        </Create>
    );
};

export default LicenseCreate;
