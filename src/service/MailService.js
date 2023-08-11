import httpClient from "../http-common";

const send = data => {
    return httpClient.post('/notes/email', data);
}

// eslint-disable-next-line
export default { send };