import axios from "axios";
import { URL_BACK } from "../constants";

const axiosClient = axios.create({
  baseURL: URL_BACK
});

export default axiosClient;