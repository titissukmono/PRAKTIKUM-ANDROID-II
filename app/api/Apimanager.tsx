import axios from "axios";

const ApiManager = axios.create({
  baseURL: "http://192.168.43.137/JURNAL_API/api/", // Ganti dengan IP server backend kamu
  responseType: "json",
});

export default ApiManager;
