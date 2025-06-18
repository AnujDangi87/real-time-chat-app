import axios from "axios";

//axios.create takes a object of url
export const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
}
);