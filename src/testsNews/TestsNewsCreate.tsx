import TestsNewsHeader from './TestsNewsHeader';
import { CreateActions } from '../components/Actions';
import {
    MultilingualContentTab,
    validateMultilingualContentCreation,
} from '../components/MultilingualContentTab';
import {
    BooleanInput,
    Create,
    SimpleForm,
    DateInput,
    required,
    ArrayInput,
    TextInput,
    SimpleFormIterator,
} from 'react-admin';
import { CSSProperties } from 'react';

const divStyle: CSSProperties = {
    display: 'flex',
    marginTop: '24px',
    width: '100%',
};

export default function TestsNewsCreate() {
    return (
        <Create actions={<CreateActions />} redirect="list">
            <SimpleForm validate={validateMultilingualContentCreation}>
                <TestsNewsHeader />
                <ArrayInput source="urls" sx={{ margin: 'auto' }}>
                    <SimpleFormIterator inline>
                        <TextInput
                            label="Lien ressource"
                            source="url"
                            sx={{ margin: 'auto' }}
                            helperText={false}
                        />
                        <BooleanInput
                            label="Proxyfier"
                            source="proxy"
                            sx={{ margin: 'auto' }}
                            helperText={false}
                        />
                    </SimpleFormIterator>
                </ArrayInput>
                <div style={divStyle}>
                    <BooleanInput
                        label="Actif"
                        source="enable"
                        sx={{ margin: 'auto' }}
                        defaultValue={true}
                        name="enable"
                        options={{}}
                    />
                    <DateInput
                        name="from"
                        label="Date début"
                        source="from"
                        defaultValue={new Date().toISOString().slice(0, 10)}
                        sx={{ margin: 'auto' }}
                        validate={required()}
                    />
                    <DateInput
                        name="to"
                        label="Date fin"
                        source="to"
                        sx={{ margin: 'auto' }}
                    />
                </div>
                <MultilingualContentTab />
            </SimpleForm>
        </Create>
    );
}
