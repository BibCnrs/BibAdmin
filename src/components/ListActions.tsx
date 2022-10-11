import {
  TopToolbar,
  ListButton,
  CloneButton,
  DeleteWithConfirmButton,
} from "react-admin";

export const ListEditActions = () => (
  <TopToolbar>
    <DeleteWithConfirmButton mutationMode="pessimistic" />
    <CloneButton />
    <ListButton />
  </TopToolbar>
);

export const ListActions = () => (
  <TopToolbar>
    <ListButton />
  </TopToolbar>
);
