import DatabasesList from "./DatabasesList";
import FolderIcon from "@mui/icons-material/Folder";
import DatabasesEdit from "./DatabasesEdit";
import DatabasesCreate from "./DatabasesCreate";

const databases = {
  list: DatabasesList,
  edit: DatabasesEdit,
  create: DatabasesCreate,
  icon: FolderIcon,
};

export default databases;
