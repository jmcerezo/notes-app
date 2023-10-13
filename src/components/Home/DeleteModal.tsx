import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ModalTransition from "../ModalTransition";
import Action from "../../enums/Action";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { deleteNote, takeAction } from "../../slices/noteSlice";

const DeleteModal = () => {
  const [open, setOpen] = useState(false);

  const action = useAppSelector((state) => state.notes.action);

  const note = useAppSelector((state) => state.notes.note);

  const dispatch = useAppDispatch();

  const handleClose = () => {
    const state = { action: "", note: {} };
    dispatch(takeAction(state));

    setOpen(false);
  };

  const handleDelete = () => {
    dispatch(deleteNote(note._id));

    handleClose();
  };

  useEffect(() => {
    if (action === Action.Delete) {
      setOpen(true);
    }
  }, [action]);

  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        TransitionComponent={ModalTransition}
      >
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            This note will be permanently deleted. You can't undo this action.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteModal;
