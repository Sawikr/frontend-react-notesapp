import axios from "axios";
import {getToken} from "./service/LoginService";

export default axios.create({
    //baseURL: "http://localhost:8080/api",
    baseURL: "https://radoslaw-sawicki-backend-react-notesapp.sawikr.repl.co/api",
    headers: {
        "Content-type": "application/json"
    }
})

export const BASE_URL = "https://radoslaw-sawicki-backend-react-notesapp.sawikr.repl.co/api";

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});