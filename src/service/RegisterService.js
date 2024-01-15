import axios from "axios";
import {BASE_URL} from "../http-common";

const register = data =>
    axios.post(BASE_URL + '/auth/register', data)

const resetPassword = (id, data) =>
    axios.patch(BASE_URL + '/auth/reset/' + id, data)

// eslint-disable-next-line
export default { register, resetPassword };