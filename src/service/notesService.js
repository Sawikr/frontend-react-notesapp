import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get("/notes");
}

const create = data => {
    return httpClient.post("/notes", data);
}

const get = id => {
    return httpClient.get(`/notes/${id}`);
}

const remove = id => {
    return httpClient.delete(`/notes/${id}`);
}

// eslint-disable-next-line
export default { getAll, create, get, remove };
