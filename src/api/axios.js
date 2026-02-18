import axios from "axios";

const api = axios.create({
  baseURL: "https://adventurous-purpose-production.up.railway.app/api/", // tu backend
});

export default api;
