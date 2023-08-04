import axios from "axios";

export default axios.create({
    // baseURL: "http://localhost:8080/api",
    baseURL: "http://radoslaw-sawicki-backend-react-notesapp.sawikr.repl.co/api",
    headers: {
        "Content-type": "application/json"
    }
})