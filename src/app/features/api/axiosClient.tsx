// src/api/axiosClient.ts
import axios from "axios";
import Config from "react-native-config";

const api = axios.create({
  baseURL: Config.API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
