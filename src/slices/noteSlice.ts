import { toast } from "react-toastify";
import { createSlice } from "@reduxjs/toolkit";
import api from "../api/notes";
import Note from "../types/Note";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    modal: {
      action: "",
      note: {} as Note,
    },
    notes: [] as Note[],
  },
  reducers: {
    dialog: (state, action) => {
      state.modal = action.payload;
    },
    onGetAll: (state, action) => {
      state.notes = action.payload;
    },
    onCreate: (state, action) => {
      state.notes.push(action.payload);
    },
    onEdit: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note._id === action.payload._id
      );

      state.notes[index] = { ...state.notes[index], ...action.payload };
    },
    onDelete: (state, action) => {
      const index = state.notes.findIndex(
        (note) => note._id === action.payload._id
      );

      state.notes.splice(index, 1);
    },
  },
});

export default noteSlice.reducer;

const { dialog, onGetAll, onCreate, onEdit, onDelete } = noteSlice.actions;

const toastFetchParams = {
  pending: "Fetching data...",
  error: "Fetching failed !",
};

const toastSaveParams = {
  pending: "Saving...",
  success: "Saved successfully.",
  error: "Saving failed !",
};

const toastDeleteParams = {
  pending: "Deleting...",
  success: "Deleted successfully.",
  error: "Delete failed !",
};

const toastOptions = {
  position: toast.POSITION.TOP_CENTER,
  toastId: "toast-promise",
  autoClose: 1500,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDialog = (data: any) => (dispatch: any) => {
  dispatch(dialog(data));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAllNotes = () => async (dispatch: any) => {
  const token = localStorage.getItem("token")!;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const promise = api.get("/notes", config).then((res) => {
    dispatch(onGetAll(res.data));
  });

  await toast.promise(promise, toastFetchParams, toastOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createNote = (data: any) => async (dispatch: any) => {
  const token = localStorage.getItem("token")!;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const promise = api.post("/notes", data, config).then((res) => {
    dispatch(onCreate(res.data));
  });

  await toast.promise(promise, toastSaveParams, toastOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const editNote = (id: string, data: any) => async (dispatch: any) => {
  const token = localStorage.getItem("token")!;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const promise = api.put(`/notes/${id}`, data, config).then((res) => {
    dispatch(onEdit(res.data));
  });

  await toast.promise(promise, toastSaveParams, toastOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteNote = (id: string) => async (dispatch: any) => {
  const token = localStorage.getItem("token")!;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const promise = api.delete(`/notes/${id}`, config).then((res) => {
    dispatch(onDelete(res.data));
  });

  await toast.promise(promise, toastDeleteParams, toastOptions);
};
