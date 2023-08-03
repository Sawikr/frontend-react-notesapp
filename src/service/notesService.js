import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/notes');
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

const update = data => {
    return httpClient.put('/notes', data);
}

const getWeather = () => {
    return httpClient.get('/notes/weather');
}

const getCurrencyEUR = () => {
    return httpClient.get('/notes/currency/eur');
}

const getCurrencyUSD = () => {
    return httpClient.get('/notes/currency/usd');
}

const getCurrencyCHF = () => {
    return httpClient.get('/notes/currency/chf');
}

const getCurrencyGBP = () => {
    return httpClient.get('/notes/currency/gbp');
}

// eslint-disable-next-line
export default { getAll, create, get, remove, update, getWeather, getCurrencyEUR, getCurrencyUSD, getCurrencyCHF, getCurrencyGBP };
