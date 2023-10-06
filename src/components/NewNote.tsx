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
import { TransitionProps } from "@mui/material/transitions";
import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { createNote, getAllNotes } from "../slices/noteSlice";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddNote = () => {
  const [open, setOpen] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTitle("");
    setContent("");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.id === "title") {
      setTitle(event.target.value);
    } else if (event.target.id === "content") {
      setContent(event.target.value);
    }
  };

  const handleSubmit = () => {
    const data = { title, content };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(createNote(data) as any);

    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dispatch(getAllNotes() as any);
    }, 1000);

    setOpen(false);
    setTitle("");
    setContent("");
  };

  React.useEffect(() => {
    if (title !== "" && content !== "") {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [title, content]);

  return (
    <div className="new-note-container">
      <Button variant="outlined" onClick={handleClickOpen}>
        New note
      </Button>
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
              New note
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
              value={title}
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
              value={content}
              onChange={handleChange}
            />
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
};

export default AddNote;
