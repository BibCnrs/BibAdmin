import PagesList from './PagesList';
import LegalCreate from './PagesCreate';
import PagesEdit from './PagesEdit';
import PolicyIcon from '@mui/icons-material/Policy';

const pages = {
    create: LegalCreate,
    edit: PagesEdit,
    list: PagesList,
    icon: PolicyIcon,
};

export default pages;
