import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get("/");
}

const create = data => {
    return httpClient.post("/notes", data);
}

// eslint-disable-next-line
export default { getAll, create };