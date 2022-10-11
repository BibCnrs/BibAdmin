import { BulkDeleteWithConfirmButton } from "react-admin";

const BulkActionButtons = () => (
  <>
    <BulkDeleteWithConfirmButton mutationMode="pessimistic" />
  </>
);

export default BulkActionButtons;
