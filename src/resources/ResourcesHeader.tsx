import { Labeled, useGetList, useRecordContext } from 'react-admin';
import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const ContentManagementHeader = () => {
    const record = useRecordContext();
    const { setValue } = useFormContext();
    const { data: communities } = useGetList('communities');
    const [selectedCommunity, setSelectedCommunity] = useState(
        record?.community || '',
    );
    useEffect(() => setSelectedCommunity(record?.community || ''), [record]);

    const handleClick = (communityId: string) => {
        if (!communityId) {
            return;
        }
        if (communityId === selectedCommunity) {
            setSelectedCommunity('');
            setValue('community', '', {
                shouldDirty: true,
            });
            return;
        }
        setSelectedCommunity(communityId);
        setValue('community', communityId, {
            shouldDirty: true,
        });
    };

    if (!communities) {
        return null;
    }

    return (
        <Labeled label="Communautés (Utilisé pour les couleur côté utilisateur connecté ou non)">
            <Stack direction="row" spacing={1}>
                {communities.map((community) => (
                    <Chip
                        key={community.id}
                        label={community.name}
                        onClick={() => handleClick(community.id)}
                        color={
                            selectedCommunity === community.id
                                ? 'primary'
                                : 'default'
                        }
                    />
                ))}
            </Stack>
        </Labeled>
    );
};

export default ContentManagementHeader;
