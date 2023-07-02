import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get("/");
}

// eslint-disable-next-line
export default { getAll };