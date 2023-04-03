import DatabasesList from './DatabasesList';
import DatabasesEdit from './DatabasesEdit';
import DatabasesCreate from './DatabasesCreate';
import FolderIcon from '@mui/icons-material/Folder';

const databases = {
    list: DatabasesList,
    edit: DatabasesEdit,
    create: DatabasesCreate,
    icon: FolderIcon,
};

export default databases;
