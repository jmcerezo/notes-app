import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getAllNotes } from "../slices/noteSlice";
import Note from "../types/Note";

const Notes = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notes = useSelector((state: any) => state.notes.notes);

  React.useEffect(() => {
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
                    borderRadius: "1rem",
                  }}
                >
                  <CardContent>
                    <Typography color="text.secondary">
                      {new Date(note.createdAt).toDateString()}
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div">
                      {note.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {note.content}
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ justifyContent: "center" }}>
                    <Button size="small" variant="outlined">
                      <EditOutlinedIcon />
                    </Button>
                    <Button size="small" variant="outlined">
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
