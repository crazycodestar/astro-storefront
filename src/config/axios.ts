import axios from "axios";

const baseURL = import.meta.env.PRIVATE_CMS_URL;

export default axios.create({
  baseURL,
  // withCredentials: true,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  },
});
