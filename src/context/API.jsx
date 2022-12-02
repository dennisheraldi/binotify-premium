import axios from "axios";
import { useAuth } from "./Auth";

export const API = axios.create({
    baseURL: "http://localhost:8002/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

API.interceptors.request.use(
    (req) => {
        const token = localStorage.getItem("token");
        if (token)
            req.headers.Authorization = `Bearer ${token}`;
        return req;
    }
);

API.interceptors.response.use(
    null,
    (error) => {
        if (error.response?.status === 401) {
            useAuth().authMethod.logout();
        }
        return Promise.reject(error);
    }
);
