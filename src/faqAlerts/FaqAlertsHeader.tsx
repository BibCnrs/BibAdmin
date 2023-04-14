import { Labeled, useRecordContext } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

export const pages = [
    { id: 'home', name: 'Alerte' },
    { id: 'faq', name: 'FAQ' },
    { id: 'legal', name: 'Mentions légales' },
    { id: 'about', name: 'A propos' },
];

const FaqAlertsHeader = () => {
    const record = useRecordContext();
    const { setValue } = useFormContext();
    const [selectedPage, setSelectedPage] = useState(record?.page || '');
    useEffect(() => setSelectedPage(record?.page || ''), [record]);

    const handleClick = (pageId: string) => {
        if (!pageId) {
            return;
        }
        setSelectedPage(pageId);
        setValue('page', pageId, {
            shouldDirty: true,
        });
    };

    return (
        <Labeled label="Page">
            <Stack direction="row" spacing={1}>
                {pages.map((page) => (
                    <Chip
                        key={page.id}
                        label={page.name}
                        onClick={() => handleClick(page.id)}
                        color={selectedPage === page.id ? 'primary' : 'default'}
                    />
                ))}
            </Stack>
        </Labeled>
    );
};

export default FaqAlertsHeader;
