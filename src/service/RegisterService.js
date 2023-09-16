import axios from "axios";
import {BASE_URL} from "../http-common";

const register = data =>
    axios.post(BASE_URL + '/auth/register', data)

// eslint-disable-next-line
export default { register };