import axios from 'axios';
import {getToken} from './service/LoginService';

export default axios.create({
    //baseURL: "http://localhost:8080/api",
    baseURL: "https://radoslaw-sawicki-backend-react-notesapp.sawikr.repl.co/api",
    headers: {
        "Content-Type": "application/json",
        //"Access-Control-Allow-Origin": "https://sawikr.github.io/"
    }
})

//export const BASE_URL = "http://localhost:8080/api";
export const BASE_URL = "https://radoslaw-sawicki-backend-react-notesapp.sawikr.repl.co/api";

axios.interceptors.request.use(function (config) {
    config.headers['Authorization'] = getToken();
    return config;
}, function (error) {
    return Promise.reject(error);
});