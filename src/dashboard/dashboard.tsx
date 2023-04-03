import { Title } from 'react-admin';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const Dashboard = () => (
    <Card
        sx={{
            mt: 1,
        }}
    >
        <Title title="Dashboard" />
        <CardContent>Bienvenue !</CardContent>
    </Card>
);

export default Dashboard;
