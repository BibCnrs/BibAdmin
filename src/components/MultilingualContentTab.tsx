import TabPanel from './TabPanel';
import { RichTextInput } from 'ra-input-rich-text';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { required, TextInput } from 'react-admin';
import { useState, SyntheticEvent } from 'react';
import { useFormState } from 'react-hook-form';

export const validateMultilingualContentCreation = (values: any) => {
    const errors: any = {};
    if (!values.content_en) {
        errors.content_en = 'ra.validation.required';
    }

    if (!values.name_en) {
        errors.name_en = 'ra.validation.required';
    }

    if (!values.content_fr) {
        errors.content_fr = 'ra.validation.required';
    }

    if (!values.name_fr) {
        errors.name_fr = 'ra.validation.required';
    }

    return errors;
};

export const MultilingualContentTab = () => {
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
                    label="resources.contentManagement.fields.name"
                    validate={required()}
                />
                <RichTextInput
                    source="content_fr"
                    label="resources.contentManagement.fields.content"
                    validate={required()}
                />
            </TabPanel>
            <TabPanel valueTab={valueTab} index={1}>
                <TextInput
                    source="name_en"
                    label="resources.contentManagement.fields.name"
                    validate={required()}
                />
                <RichTextInput
                    source="content_en"
                    label="resources.contentManagement.fields.content"
                    validate={required()}
                />
            </TabPanel>
        </>
    );
};
