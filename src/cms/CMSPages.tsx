import { Labeled, useRecordContext } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const CMSPages = () => {
    const record = useRecordContext();
    const { setValue } = useFormContext();
    const pages = [
        { id: 'home', name: "Page d'accueil" },
        { id: 'faq', name: 'FAQ' },
        { id: 'legal', name: 'Mentions légales' },
    ];
    const [selectedPages, setSelectedPages] = useState<string[]>(
        record?.pages || [],
    );
    useEffect(() => setSelectedPages(record?.pages), [record]);

    const handleClick = (pageId: string) => {
        if (!pageId) {
            return;
        }

        const pageIndex = selectedPages.findIndex(
            (page: string) => page === pageId,
        );
        if (pageIndex !== -1) {
            const newSelectedPage = [...selectedPages];
            newSelectedPage.splice(pageIndex, 1);
            setSelectedPages(newSelectedPage);
            setValue('pages', newSelectedPage, {
                shouldDirty: true,
            });
            return;
        }

        const newSelectedPage = [...selectedPages, pageId];
        setSelectedPages(newSelectedPage);
        setValue('pages', newSelectedPage, {
            shouldDirty: true,
        });
    };

    if (!pages) {
        return null;
    }

    return (
        <Labeled label="Page">
            <Stack direction="row" spacing={1}>
                {pages.map((page) => (
                    <Chip
                        key={page.id}
                        label={page.name}
                        onClick={() => handleClick(page.id)}
                        color={
                            selectedPages?.find((pageId) => pageId === page.id)
                                ? 'primary'
                                : 'default'
                        }
                    />
                ))}
            </Stack>
        </Labeled>
    );
};

export default CMSPages;
