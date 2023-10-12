import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Grow from "@mui/material/Grow";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Action from "../../enums/Action";
import Note from "../../types/Note";
import { getAllNotes, takeAction } from "../../slices/noteSlice";
import searchFor from "../../utils/searchFor";

const Notes = () => {
  const [show, setShow] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notes: Note[] = useSelector((state: any) => state.notes.notes);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const keyword: string = useSelector((state: any) => state.notes.keyword);

  const dispatch = useDispatch();

  const handleClickEdit = (note: Note) => {
    const state = { action: Action.Edit, note };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(takeAction(state) as any);
  };

  const handleClickDelete = (note: Note) => {
    const state = { action: Action.Delete, note };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(takeAction(state) as any);
  };

  useEffect(() => {
    setShow(true);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(getAllNotes() as any);
  }, [dispatch]);

  return (
    <div className="notes-wrapper">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} justifyContent="center">
          {notes.filter(searchFor(keyword)).map((note: Note) => (
            <Grid xs={12} sm={6} md={3} key={note._id}>
              <Grow
                in={show}
                timeout={1000}
                style={{ transformOrigin: "0 0 0" }}
              >
                <Card
                  sx={{
                    maxWidth: 500,
                    height: "100%",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography color="text.secondary">
                      {new Date(note.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="note-title"
                    >
                      {note.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className="note-content"
                    >
                      {note.content}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center", mb: 1 }}>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleClickEdit(note)}
                    >
                      <EditOutlinedIcon />
                    </Button>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => handleClickDelete(note)}
                    >
                      <DeleteOutlinedIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grow>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default Notes;
