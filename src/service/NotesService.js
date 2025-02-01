import axios from "axios";
import {BASE_URL} from "../http-common";

export const getAll = () =>
    axios.get(BASE_URL + '/notes')

export const create = data =>
    axios.post(BASE_URL + '/notes', data)

export const get = id =>
    axios.get(BASE_URL + `/notes/${id}`)

export const remove = id =>
    axios.delete(BASE_URL + `/notes/${id}`)

export const update = data =>
    axios.put(BASE_URL + '/notes', data)

export const updateNoteFields = (id, data) =>
    axios.patch(BASE_URL + '/notes/' + id, data)

export const getWeather = () =>
    axios.get(BASE_URL + '/notes/weather')

export const getCurrencyEUR = () =>
    axios.get(BASE_URL + '/notes/currency/eur')

export const getCurrencyUSD = () =>
    axios.get(BASE_URL + '/notes/currency/usd')

export const getCurrencyCHF = () =>
    axios.get(BASE_URL + '/notes/currency/chf')

export const getCurrencyGBP = () =>
    axios.get(BASE_URL + '/notes/currency/gbp')

export const getShare1 = () =>
    axios.get(BASE_URL + '/notes/data/one')

export const getShare2 = () =>
    axios.get(BASE_URL + '/notes/data/two')

export const getShare3 = () =>
    axios.get(BASE_URL + '/notes/data/three')

export const getShare4 = () =>
    axios.get(BASE_URL + '/notes/data/four')

export const getShare5 = () =>
    axios.get(BASE_URL + '/notes/data/five')

export const getShare6 = () =>
    axios.get(BASE_URL + '/notes/data/six')

// eslint-disable-next-line
export default { getAll, create, get, remove, update, updateNoteFields, getWeather, getCurrencyEUR, getCurrencyUSD, getCurrencyCHF, getCurrencyGBP, getShare1, getShare2, getShare3, getShare4, getShare5, getShare6 };