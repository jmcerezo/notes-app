import axios from "axios";
import { NOTES_API } from "../utils/constants";

const token = localStorage.getItem("token");

export default axios.create({
  baseURL: NOTES_API,
  headers: { Authorization: `Bearer ${token}` },
});
