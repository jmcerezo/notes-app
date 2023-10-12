import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import Action from "../../enums/Action";
import { takeAction } from "../../slices/noteSlice";

const NewNote = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const state = { action: Action.Create, note: {} };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(takeAction(state) as any);
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
