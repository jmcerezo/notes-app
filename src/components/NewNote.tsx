import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { handleDialog } from "../slices/noteSlice";
import Action from "../enums/Action";

const NewNote = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const modal = { action: Action.Create, note: {} };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(handleDialog(modal) as any);
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
