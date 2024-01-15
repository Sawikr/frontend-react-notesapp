import axios from "axios";
import {BASE_URL} from "../http-common";

const get = id =>
    axios.get(BASE_URL + `/notes/email/${id}`)

const send = data =>
    axios.post(BASE_URL + '/notes/email', data)

const resend = data =>
    axios.post(BASE_URL + '/notes/resend', data)

// eslint-disable-next-line
export default { get, send, resend };