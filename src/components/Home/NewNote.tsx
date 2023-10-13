import Button from "@mui/material/Button";
import Action from "../../enums/Action";
import { useAppDispatch } from "../../hooks";
import { takeAction } from "../../slices/noteSlice";

const NewNote = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const state = { action: Action.Create, note: {} };
    dispatch(takeAction(state));
  };

  return (
    <div className="new-note">
      <Button variant="contained" onClick={handleClick}>
        New Note
      </Button>
    </div>
  );
};

export default NewNote;
