import * as React from 'react';
import { Labeled, useGetList, useRecordContext } from 'react-admin';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import { useFormContext } from 'react-hook-form';

export const LicenseCommunities = () => {
    const record = useRecordContext();
    const { setValue } = useFormContext();
    const { data: communities } = useGetList('communities');
    const [selectedCommunities, setSelectedCommunities] = React.useState(
        record?.license_community || [],
    );

    React.useEffect(() => {
        setSelectedCommunities(record?.license_community || []);
    }, [record]);

    const handleClick = (communityId: number) => {
        if (!communityId) {
            return;
        }

        // if object with communityId is already selected, remove it
        const communityIndex = selectedCommunities.findIndex(
            (community: any) => community.community_id === communityId,
        );
        if (communityIndex !== -1) {
            const newSelectedCommunities = [...selectedCommunities];
            newSelectedCommunities.splice(communityIndex, 1);
            setSelectedCommunities(newSelectedCommunities);
            setValue('license_community', newSelectedCommunities, {
                shouldDirty: true,
            });
            return;
        }

        // if object with communityId is not already selected, add it
        const newSelectedCommunities = [
            ...selectedCommunities,
            { community_id: communityId },
        ];
        setSelectedCommunities(newSelectedCommunities);
        setValue('license_community', newSelectedCommunities, {
            shouldDirty: true,
        });
    };

    if (!communities) {
        return null;
    }

    return (
        <Labeled label="Statut relationnel">
            <Stack direction="row" spacing={1}>
                {communities.map((community) => (
                    <Chip
                        key={community.id}
                        label={community.name}
                        onClick={() => handleClick(community.id)}
                        color={
                            selectedCommunities?.find(
                                (license: any) =>
                                    license.community_id === community.id,
                            )
                                ? 'primary'
                                : 'default'
                        }
                    />
                ))}
            </Stack>
        </Labeled>
    );
};
