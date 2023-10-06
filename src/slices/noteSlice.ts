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

const toastSaveParams = {
  pending: "Saving...",
  success: "Saved successfully.",
  error: "Saving failed !",
};

const toastFetchParams = {
  pending: "Fetching data...",
  error: "Fetching failed !",
};

const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
  toastId: "toast-promise",
  autoClose: 1500,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNote = (data: any) => async (dispatch: any) => {
  const token = localStorage.getItem("token")!;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const promise = api.post("/notes", data, config).then((res) => {
    dispatch(create(res.data));
  });

  await toast.promise(promise, toastSaveParams, toastOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllNotes = () => async (dispatch: any) => {
  const token = localStorage.getItem("token")!;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const promise = api.get("/notes", config).then((res) => {
    dispatch(getAll(res.data));
  });

  await toast.promise(promise, toastFetchParams, toastOptions);
};
