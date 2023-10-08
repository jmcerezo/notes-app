import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Action from "../enums/Action";
import Note from "../types/Note";
import { getAllNotes, handleDialog } from "../slices/noteSlice";

const Notes = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notes: Note[] = useSelector((state: any) => state.notes.notes);

  const dispatch = useDispatch();

  const handleEdit = (note: Note) => {
    const dialog = { action: Action.Edit, note };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(handleDialog(dialog) as any);
  };

  const handleDelete = (note: Note) => {
    const dialog = { action: Action.Delete, note };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(handleDialog(dialog) as any);
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch(getAllNotes() as any);
  }, [dispatch]);

  return (
    <>
      <div className="notes-container">
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            {notes.map((note: Note) => (
              <Grid xs={12} sm={6} md={3} key={note._id}>
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
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleEdit(note)}
                    >
                      <EditOutlinedIcon />
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => handleDelete(note)}
                    >
                      <DeleteOutlinedIcon />
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default Notes;
