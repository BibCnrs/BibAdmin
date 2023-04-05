import FaqAlertsHeader from './FaqAlertsHeader';
import { EditActions } from '../components/Actions';
import { MultilingualContentTab } from '../components/MultilingualContentTab';
import {
    BooleanInput,
    DateInput,
    Edit,
    required,
    SimpleForm,
} from 'react-admin';
import { CSSProperties } from 'react';

const divStyle: CSSProperties = {
    display: 'flex',
    marginTop: '24px',
    width: '100%',
};

export default function FaqAlertsEdit() {
    return (
        <Edit actions={<EditActions />} redirect="list">
            <SimpleForm>
                <FaqAlertsHeader />
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
