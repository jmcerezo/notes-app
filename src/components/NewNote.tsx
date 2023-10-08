import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import Action from "../enums/Action";
import { handleDialog } from "../slices/noteSlice";

const NewNote = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const dialog = { action: Action.Create, note: {} };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(handleDialog(dialog) as any);
  };

  return (
    <div className="new-note-container">
      <Button variant="outlined" onClick={handleClick}>
        New Note
      </Button>
    </div>
  );
};

export default NewNote;
