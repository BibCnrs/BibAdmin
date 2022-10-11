import {
  TopToolbar,
  ListButton,
  CloneButton,
  DeleteWithConfirmButton,
  FilterButton,
  CreateButton,
  ExportButton,
} from "react-admin";

export const EditActions = () => (
  <TopToolbar>
    <DeleteWithConfirmButton mutationMode="undoable" />
    <CloneButton />
    <ListButton />
  </TopToolbar>
);

export const CreateActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);

export const ListActions = () => (
  <TopToolbar>
    <FilterButton />
    <CreateButton />
    <ExportButton maxResults={100000} />
  </TopToolbar>
);
