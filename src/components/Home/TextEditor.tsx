import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import ModalTransition from "../ModalTransition";
import Action from "../../enums/Action";
import FormState from "../../enums/FormState";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { createNote, editNote, takeAction } from "../../slices/noteSlice";

const TextEditor = () => {
  const [open, setOpen] = useState(false);
  const [disable, setDisable] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [formState, setFormState] = useState<FormState>(FormState.Unchanged);

  const action = useAppSelector((state) => state.notes.action);

  const note = useAppSelector((state) => state.notes.note);

  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "title") {
      setTitle(event.target.value);
    } else if (event.target.id === "content") {
      setContent(event.target.value);
    }
  };

  const handleClose = () => {
    const state = { action: "", note: {} };
    dispatch(takeAction(state));

    handleCloseModal();
    setOpen(false);
    setTitle("");
    setContent("");
    setFormState(FormState.Unchanged);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleDiscardModal = () => {
    formState !== FormState.Unchanged ? setModalOpen(true) : handleClose();
  };

  const handleBeforeUnload = (event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  };

  const handleSubmit = () => {
    const data = { title, content };

    if (action === Action.Create) {
      dispatch(createNote(data));
    } else if (action === Action.Edit) {
      dispatch(editNote(note._id, data));
    }

    handleClose();
  };

  useEffect(() => {
    if (action === Action.Create || action === Action.Edit) {
      setOpen(true);

      if (action === Action.Edit) {
        setTitle(note.title);
        setContent(note.content);
      }
    }
  }, [action, note.title, note.content]);

  useEffect(() => {
    if (action === Action.Create) {
      if (!title && !content) {
        setDisable(true);
        setFormState(FormState.Unchanged);
      } else if (!title || !content) {
        setDisable(true);
        setFormState(FormState.Modified);
      } else {
        setDisable(false);
        setFormState(FormState.Saving);
      }
    } else if (action === Action.Edit) {
      if (title === note.title && content === note.content) {
        setDisable(true);
        setFormState(FormState.Unchanged);
      } else if (!title || !content) {
        setDisable(true);
        setFormState(FormState.Modified);
      } else {
        setDisable(false);
        setFormState(FormState.Saving);
      }
    }

    if (formState !== FormState.Unchanged) {
      window.addEventListener("beforeunload", handleBeforeUnload);

      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [action, title, content, note.title, note.content, formState]);

  return (
    <div>
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        TransitionComponent={ModalTransition}
      >
        <DialogTitle>Discard {note._id ? "changes" : "note"}?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your {note._id ? "changes" : "note"} will not be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", mb: 1 }}>
          <Button variant="outlined" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Discard
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen
        open={open}
        onClose={handleDiscardModal}
        TransitionComponent={ModalTransition}
      >
        <AppBar sx={{ position: "fixed" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleDiscardModal}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Note
            </Typography>
            <Button color="inherit" onClick={handleSubmit} disabled={disable}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <List sx={{ mt: "3.5rem" }}>
          <ListItem sx={{ mt: 1 }}>
            {note.updatedAt ? (
              <Typography
                sx={{ ml: 2, flex: 1, textAlign: "center" }}
                variant="subtitle2"
                component="h6"
              >
                Updated at {new Date(note.updatedAt).toLocaleString()}
              </Typography>
            ) : (
              <Typography
                sx={{ ml: 2, flex: 1, textAlign: "center" }}
                variant="subtitle2"
              >
                {new Date().toLocaleDateString()}
              </Typography>
            )}
          </ListItem>
          <ListItem>
            <TextField
              variant="standard"
              label="Title"
              id="title"
              fullWidth
              defaultValue={note.title}
              onChange={handleChange}
            />
          </ListItem>
          <ListItem>
            <TextField
              variant="standard"
              label="Content"
              id="content"
              fullWidth
              multiline
              minRows={5}
              defaultValue={note.content}
              onChange={handleChange}
              InputProps={{ disableUnderline: true }}
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default TextEditor;
