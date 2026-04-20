import axios from "axios";
import { VITE_BASE_URL } from "./apiPaths.js";

const axiosInstance = axios.create({
    baseURL: VITE_BASE_URL,
    timeout: 20000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
    },
});

//* request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem("token");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//* response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        //* handle common errors globally
        if (error.response) {
            if (error.response.status === 401) {
                //* redirect to login page
                localStorage.removeItem("token");
                window.location.href = "/login";
            } else if (error.response.status === 500) {
                console.error("Server error. Please try again later.");
            }
        } else if (error.code === "ECONNABORTED") {
            console.warn("Slow network... retrying or waiting");
            return Promise.reject({
                message: "Server is taking too long. Please wait..."
            });
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;