import { createSlice } from "@reduxjs/toolkit";
import api from "../api/notes";
import Data from "../types/Data";
import Note from "../types/Note";
import State from "../types/State";
import { toast } from "react-toastify";
import {
  toastFetchParams,
  toastSaveParams,
  toastDeleteParams,
  toastPromiseOptions,
} from "../utils/constants";
import requestConfig from "../utils/requestConfig";

const noteSlice = createSlice({
  name: "notes",
  initialState: {
    action: "",
    keyword: "",
    note: {} as Note,
    notes: [] as Note[],
  },
  reducers: {
    onAction: (state, action) => {
      state.action = action.payload.action;
      state.note = action.payload.note;
    },
    onGetAll: (state, action) => {
      state.notes = action.payload;
    },
    onCreate: (state, action) => {
      state.notes.unshift(action.payload);
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

const { onAction, onGetAll, onCreate, onEdit, onDelete, onSearch } =
  noteSlice.actions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const takeAction = (state: State) => (dispatch: any) => {
  dispatch(onAction(state));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getAllNotes = () => async (dispatch: any) => {
  const config = requestConfig();

  const promise = api.get("notes", config).then((res) => {
    dispatch(onGetAll(res.data));
  });

  await toast.promise(promise, toastFetchParams, toastPromiseOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createNote = (data: Data) => async (dispatch: any) => {
  const config = requestConfig();

  const promise = api.post("notes", data, config).then((res) => {
    dispatch(onCreate(res.data));
  });

  await toast.promise(promise, toastSaveParams, toastPromiseOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const editNote = (id: string, data: Data) => async (dispatch: any) => {
  const config = requestConfig();

  const promise = api.put(`notes/${id}`, data, config).then((res) => {
    dispatch(onEdit(res.data));
  });

  await toast.promise(promise, toastSaveParams, toastPromiseOptions);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteNote = (id: string) => async (dispatch: any) => {
  const config = requestConfig();

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
  takeAction,
  getAllNotes,
  createNote,
  editNote,
  deleteNote,
  searchNote,
};
