import axios from "axios";
import { getAccessToken } from "./auth";

const api = axios.create({
    baseURL: "https://t04pzf6r-3000.asse.devtunnels.ms",
});

api.interceptors.request.use(async (config) => {
    const token = await getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
