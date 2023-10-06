import axios from "axios";
import { NOTES_API } from "../utils/constants";

export default axios.create({
  baseURL: NOTES_API,
});
