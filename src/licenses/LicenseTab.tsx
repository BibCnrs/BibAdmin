import TabPanel from '../components/TabPanel';
import { RichTextInput } from 'ra-input-rich-text';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { required, TextInput } from 'react-admin';
import { useState, SyntheticEvent } from 'react';
import { useFormState } from 'react-hook-form';

export const LicenseTab = () => {
    const [valueTab, setValueTab] = useState(0);
    const { errors } = useFormState();

    const handleChange = (event: SyntheticEvent, newValue: number) => {
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
