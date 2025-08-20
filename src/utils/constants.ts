import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.PROD
  ? "https://material-notes-api.vercel.app"
  : "http://localhost:3000";

const alphabetRegex = /^[a-zA-Z ]*$/;
const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

const toastLoginParams = {
  pending: "Logging in...",
};

const toastSignUpParams = {
  pending: "Signing up...",
  success: "Your account has been created.",
};

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

const toastLoadingOptions = {
  position: toast.POSITION.TOP_CENTER,
  toastId: "toast-loading",
};

const toastPromiseOptions = {
  position: toast.POSITION.TOP_CENTER,
  toastId: "toast-promise",
  autoClose: 2500,
};

const toastErrorOptions = {
  position: toast.POSITION.TOP_CENTER,
  toastId: "toast-error",
  autoClose: 2500,
};

export {
  API_BASE_URL,
  alphabetRegex,
  emailRegex,
  passwordRegex,
  toastLoginParams,
  toastSignUpParams,
  toastFetchParams,
  toastSaveParams,
  toastDeleteParams,
  toastLoadingOptions,
  toastPromiseOptions,
  toastErrorOptions,
};
