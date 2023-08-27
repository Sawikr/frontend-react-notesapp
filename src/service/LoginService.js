import httpClient from "../http-common";

const sendLogin = data => {
    return httpClient.post('/users', data);
}

const sendList = data => {
    return httpClient.post('/noteLists', data);
}

// eslint-disable-next-line
export default { sendLogin, sendList };