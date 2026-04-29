import axios from "axios";

const api = axios.create({
  baseURL: "https://adventurous-purpose-production.up.railway.app/api/",
  //baseURL: "http://localhost:8080/api/", 
});

export default api;
