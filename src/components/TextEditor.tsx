import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import TextField from "@mui/material/TextField";
import { TransitionProps } from "@mui/material/transitions";
import { useDispatch, useSelector } from "react-redux";
import {
  createNote,
  editNote,
  getAllNotes,
  handleDialog,
} from "../slices/noteSlice";
import Action from "../enums/Action";
import Note from "../types/Note";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TextEditor = () => {
  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const action: Action = useSelector((state: any) => state.notes.modal.action);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const note: Note = useSelector((state: any) => state.notes.modal.note);

  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "title") {
      setTitle(event.target.value);
    } else if (event.target.id === "content") {
      setContent(event.target.value);
    }
  };

  const handleClose = () => {
    const modal = { action: "", note: {} };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(handleDialog(modal) as any);

    setOpen(false);
    setTitle("");
    setContent("");
  };

  const handleSubmit = () => {
    const noteTitle = title ? title : note.title;
    const noteContent = content ? content : note.content;
    const data = { title: noteTitle, content: noteContent };

    if (action === Action.Create) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(createNote(data) as any);
    } else if (action === Action.Edit) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(editNote(note._id, data) as any);
    }

    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(getAllNotes() as any);
    }, 1000);

    handleClose();
  };

  React.useEffect(() => {
    if (action === Action.Create || action === Action.Edit) {
      setOpen(true);
    }

    if (action === Action.Create) {
      if (title !== "" && content !== "") {
        setDisable(false);
      } else {
        setDisable(true);
      }
    } else if (action === Action.Edit) {
      if (title === "" && content === "") {
        setDisable(true);
      } else if (title === note.title && content === "") {
        setDisable(true);
      } else if (content === note.content && title === "") {
        setDisable(true);
      } else if (title === note.title && content === note.content) {
        setDisable(true);
      } else {
        setDisable(false);
      }
    }
  }, [action, title, content, note.content, note.title]);

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "fixed" }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Note
          </Typography>
          <Button
            autoFocus
            color="inherit"
            onClick={handleSubmit}
            disabled={disable}
          >
            Save
          </Button>
        </Toolbar>
      </AppBar>
      <List sx={{ marginTop: "4rem" }}>
        <ListItem>
          <TextField
            label="Title"
            id="title"
            fullWidth
            defaultValue={note.title}
            onChange={handleChange}
          />
        </ListItem>
        <ListItem>
          <TextField
            label="Content"
            id="content"
            fullWidth
            multiline
            minRows={15}
            defaultValue={note.content}
            onChange={handleChange}
          />
        </ListItem>
      </List>
    </Dialog>
  );
};

export default TextEditor;
