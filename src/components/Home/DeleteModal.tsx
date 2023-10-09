import { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Action from "../../enums/Action";
import Note from "../../types/Note";
import { deleteNote, getAllNotes, handleDialog } from "../../slices/noteSlice";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DeleteModal = () => {
  const [open, setOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const action: Action = useSelector((state: any) => state.notes.action);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const note: Note = useSelector((state: any) => state.notes.note);

  const dispatch = useDispatch();

  const handleClose = () => {
    const dialog = { action: "", note: {} };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(handleDialog(dialog) as any);

    setOpen(false);
  };

  const handleDelete = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(deleteNote(note._id) as any);

    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(getAllNotes() as any);
    }, 2500);

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
        TransitionComponent={Transition}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Delete Note</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete?
          </DialogContentText>
          <DialogContentText className="note-title">
            Title: {note.title}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={handleClose} variant="outlined">
            No
          </Button>
          <Button onClick={handleDelete} variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DeleteModal;
