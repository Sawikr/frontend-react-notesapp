import httpClient from "../http-common";

const sendLogin = data => {
    return httpClient.post('/users', data);
}

// eslint-disable-next-line
export default { sendLogin };