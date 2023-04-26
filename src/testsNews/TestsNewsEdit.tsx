import TestsNewsHeader from './TestsNewsHeader';
import { EditActions } from '../components/Actions';
import { MultilingualContentTab } from '../components/MultilingualContentTab';
import {
    ArrayInput,
    BooleanInput,
    DateInput,
    Edit,
    required,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
} from 'react-admin';
import { CSSProperties } from 'react';

const divStyle: CSSProperties = {
    display: 'flex',
    marginTop: '24px',
    width: '100%',
};

export default function TestsNewsEdit() {
    return (
        <Edit actions={<EditActions />} redirect="list">
            <SimpleForm>
                <TestsNewsHeader />
                <ArrayInput source="urls">
                    <SimpleFormIterator inline>
                        <TextInput
                            label="Lien ressource"
                            source="url"
                            sx={{ margin: 'auto' }}
                            helperText={false}
                        />
                        <TextInput
                            label="Nom de la ressource"
                            source="name"
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
        </Edit>
    );
}
