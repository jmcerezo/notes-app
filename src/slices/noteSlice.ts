import { createSlice } from "@reduxjs/toolkit";
import api from "../api/notes";
import Note from "../types/Note";
import { toast } from "react-toastify";
import {
  toastFetchParams,
  toastSaveParams,
  toastDeleteParams,
  toastPromiseOptions,
} from "../utils/constants";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    action: "",
    keyword: "",
    note: {} as Note,
    notes: [] as Note[],
  },
  reducers: {
    dialog: (state, action) => {
      state.action = action.payload.action;
      state.note = action.payload.note;
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
    onSearch: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

export default noteSlice.reducer;

const { dialog, onGetAll, onCreate, onEdit, onDelete, onSearch } =
  noteSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDialog = (data: any) => (dispatch: any) => {
  dispatch(dialog(data));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllNotes = () => async (dispatch: any) => {
  const token = localStorage.getItem("token")!;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const promise = api.get("notes", config).then((res) => {
    dispatch(onGetAll(res.data));
  });

  await toast.promise(promise, toastFetchParams, toastPromiseOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createNote = (data: any) => async (dispatch: any) => {
  const token = localStorage.getItem("token")!;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const promise = api.post("notes", data, config).then((res) => {
    dispatch(onCreate(res.data));
  });

  await toast.promise(promise, toastSaveParams, toastPromiseOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editNote = (id: string, data: any) => async (dispatch: any) => {
  const token = localStorage.getItem("token")!;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const promise = api.put(`notes/${id}`, data, config).then((res) => {
    dispatch(onEdit(res.data));
  });

  await toast.promise(promise, toastSaveParams, toastPromiseOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteNote = (id: string) => async (dispatch: any) => {
  const token = localStorage.getItem("token")!;
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const promise = api.delete(`notes/${id}`, config).then((res) => {
    dispatch(onDelete(res.data));
  });

  await toast.promise(promise, toastDeleteParams, toastPromiseOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const searchNote = (keyword: string) => async (dispatch: any) => {
  dispatch(onSearch(keyword));
};

export {
  handleDialog,
  getAllNotes,
  createNote,
  editNote,
  deleteNote,
  searchNote,
};
