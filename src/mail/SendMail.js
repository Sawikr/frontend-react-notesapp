import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import NotesService from "../service/NotesService";
import EmailService from "../service/MailService";

const SendMail = () => {

    const[emailName, setEmailName] = useState('');
    const[noteTitle, setNoteTitle] = useState('');
    const[body, setBody] = useState('');
    const[currentNote, setCurrentNote] = useState('');
    const[errors, setErrors] = useState(false);
    const {id} = useParams();
    const history = useHistory();

    useEffect(() => {
        NotesService.get(id)
            .then(note => {
                setCurrentNote(note.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, []);

    const sendMail = (e) => {
        e.preventDefault();
        if (!emailName || !noteTitle || !body) {
            setErrors(true);
            return;
        }
        const email = {emailName, noteTitle, body};
        if (id) {
            EmailService.send(email)
                .then(response => {
                    console.log("Email sent successfully", response.data);
                    alert('Sending an email to ' + emailName + ' was successful!');
                    history.push('/radoslaw-sawicki-frontend-react-notesapp');
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                })
        }
    }

    useEffect(() => {
        if (id) {
            NotesService.get(id)
                .then(note => {
                    setEmailName(note.data.emailName);
                    setBody(note.data.body);
                    setNoteTitle(note.data.title);
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
                {errors && <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Email: <sup>*</sup></label>
                    <input
                        type="text"
                        className="form-control"
                        id="emailName"
                        value={emailName}
                        onChange={(e) => setEmailName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="title">Note Title: <sup>*</sup></label>
                    <input
                        type="text"
                        className="form-control"
                        id="noteTitle"
                        value={currentNote.title}
                        onChange={(e) => setNoteTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Note Description: <sup>*</sup></label>
                    <textarea
                        id="body"
                        className="form-control"
                        value={currentNote.body}
                        onChange={(e) => setBody(e.target.value)}>
                    </textarea>
                </div>
                <div className="text-center">
                    <button onClick={(e) => sendMail(e)}>Send note</button>
                </div>
            </form>
        </div>
    );
}

export default SendMail;