import axios from "axios";
import httpClient, {BASE_URL} from "../http-common";

const sendLogin = data =>
    axios.post(BASE_URL + '/users', data);

const sendList = data =>
    axios.post(BASE_URL + '/noteLists', data);

const loginObj = (usernameOrEmail, password) => {
    return httpClient.post(BASE_URL + '/auth/login', {usernameOrEmail, password})
};

export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

export const saveLoggedInUser = (username) => sessionStorage.setItem("authenticatedUser", username);

export const isUserLoggedIn = () => {
    const username = sessionStorage.getItem("authenticatedUser");
    if (username == null) {
        return false;
    } else
        return true;
}

export const getLoggedInUser = () => {
    return sessionStorage.getItem("authenticatedUser");
}

// eslint-disable-next-line
export default { sendLogin, sendList, loginObj };