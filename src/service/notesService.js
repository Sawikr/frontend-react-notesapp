import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get("/notesApp");
}

export default { getAll };