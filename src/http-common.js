import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/api",
    //baseURL: "https://radoslaw-sawicki-backend-react-notesapp.sawikr.repl.co/api",
    headers: {
        "Content-type": "application/json"
    }
})