import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import MailService from "../service/MailService";
import NotesService from "../service/NotesService";

const SendMail = () => {
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');
    const[email, setEmail] = useState('');
    const[errors, setErrors] = useState(false);
    const {id} = useParams();
    const history = useHistory();

    const sendMail = (e) => {
        e.preventDefault();
        if (!email || !title || !body) {
            setErrors(true);
            return;
        }

        const sendEmail = {email, title, body, id};
        if (id) {
            MailService.send(sendEmail)
                .then(response => {
                    console.log(sendEmail);
                    console.log("Email sent successfully", response.data);
                    alert("E-mail sent successfully to " + email + "!");
                    history.push("/notes/list");
                })
                .catch(error => {
                    console.log("An error occurred!", error);
                })
        }
    }

    useEffect(() => {
        if (id) {
            NotesService.get(id)
                .then(note => {
                    setTitle(note.data.title);
                    setBody(note.data.body);
                })
                .catch(error => {
                    console.log("An error occurred!", error);
                })
        }

        if (id) {
            MailService.get(id)
                .then(sendEmail => {
                    setEmail(sendEmail.data.email);
                    setTitle(sendEmail.data.title);
                    setBody(sendEmail.data.body);
                })
                .catch(error => {
                    console.log("An error occurred!", error);
                })
        }
    }, []);

    return (
            <div className="create">
                <div className="text-center">
                    <h5>Send a Email</h5>
                    {errors &&
                        <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
                </div>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email: <sup>*</sup></label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Note Title: <sup>*</sup></label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="body">Note Description: <sup>*</sup></label>
                        <textarea
                            id="body"
                            className="form-control"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}>
                    </textarea>
                    </div>
                    <div className="text-center">
                        <button onClick={(e) => sendMail(e)}>Send Email</button>
                    </div>
                </form>
            </div>
    );
}

export default SendMail;