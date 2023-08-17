import httpClient from "../http-common";

const get = id => {
    return httpClient.get(`/notes/email/${id}`);
}

const send = data => {
    return httpClient.post('/notes/email', data);
}

// eslint-disable-next-line
export default { get, send };