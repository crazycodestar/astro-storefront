import axios from "axios";

export const baseURL = import.meta.env.PUBLIC_CMS_URL;

export default axios.create({
  // baseURL: "http://localhost:9000",
  baseURL,
  // withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
