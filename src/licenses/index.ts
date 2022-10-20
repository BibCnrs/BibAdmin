import LicenseList from './LicenseList';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LicenseCreate from './LicenseCreate';
import LicenseEdit from './LicenseEdit';

const licenses = {
    create: LicenseCreate,
    edit: LicenseEdit,
    list: LicenseList,
    icon: AccountBalanceIcon,
};

export default licenses;
