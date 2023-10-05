import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import api from "../api/notes";
import Note from "../types/Note";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [] as Note[],
  },
  reducers: {
    create: (state, action) => {
      state.notes.push(action.payload);
    },
    getAll: (state, action) => {
      state.notes = action.payload;
    },
  },
});

export default noteSlice.reducer;

const { create, getAll } = noteSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNote = (data: any) => async (dispatch: any) => {
  await api
    .post("/notes", data)
    .then((res) => {
      dispatch(create(res.data));

      toast.success("Saved successfully.", {
        position: toast.POSITION.TOP_CENTER,
        toastId: "toast-success",
        autoClose: 1000,
      });
    })
    .catch((err) => {
      console.log(err);

      const errorMessage = err.response
        ? err.response.data.message
        : err.message;

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        toastId: "toast-error",
      });
    });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllNotes = () => async (dispatch: any) => {
  const loading = toast.loading("Loading...", {
    position: toast.POSITION.TOP_CENTER,
    toastId: "toast-loading",
  });

  await api
    .get("/notes")
    .then((res) => {
      toast.dismiss(loading);
      dispatch(getAll(res.data));
    })
    .catch((err) => {
      console.log(err);

      const errorMessage = err.response
        ? err.response.data.message
        : err.message;

      toast.error(errorMessage, {
        position: toast.POSITION.TOP_CENTER,
        toastId: "toast-error",
      });
    });
};
