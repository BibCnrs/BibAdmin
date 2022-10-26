import { RichTextInput } from 'ra-input-rich-text';
import { Box, Tab, Tabs } from '@mui/material';
import { required, TextInput } from 'react-admin';
import { useState } from 'react';
import { useFormState } from 'react-hook-form';

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

export const LicenseTab = () => {
    const [valueTab, setValueTab] = useState(0);
    const { errors } = useFormState();
    
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValueTab(newValue);
    };

    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                    value={valueTab}
                    onChange={handleChange}
                    aria-label="language tabs"
                >
                    <Tab
                        label="Français"
                        sx={{
                            color:
                                (errors.content_fr || errors.name_fr) && 'red',
                        }}
                    />
                    <Tab
                        label="Anglais"
                        sx={{
                            color:
                                (errors.content_en || errors.name_en) && 'red',
                        }}
                    />
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
        </>
    );
};
