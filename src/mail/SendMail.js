import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import MailService from "../service/MailService";
import NotesService from "../service/NotesService";
import Popup from "reactjs-popup";
import Space from "../element/Space";

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
    }, []);

    return (
            <div className="create">
                <div className="text-center">
                    <h5>Send a Email</h5>
                    {!errors && <Space/>}
                    {errors &&
                        <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
                </div>
                <form>
                    <div className="form-group">
                        <Popup trigger={<label htmlFor="email">Email: <sup>*</sup></label>}
                               position="right center">
                            <div className="popup-body">
                                <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                            </div>
                        </Popup>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <Popup trigger={<label htmlFor="title">Note Title: <sup>*</sup></label>}
                               position="right center">
                            <div className="popup-body">
                                <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                            </div>
                        </Popup>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <Popup trigger={<label htmlFor="body">Note Description: <sup>*</sup></label>}
                               position="right center">
                            <div className="popup-body">
                                <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                            </div>
                        </Popup>
                        <textarea
                            id="body"
                            className="form-control"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}>
                    </textarea>
                    </div>
                    <label className="text-md-left" style={{color: 'black', fontSize: "11px"}}>
                        <span style={{textAlignVertical: 'center', fontSize: "8px", fontStyle: 'italic'}}>*</span> Press</label>
                    <div className="text-center">
                        <button onClick={(e) => sendMail(e)}>Send Email</button>
                    </div>
                </form>
                <Space/>
            </div>
    );
}

export default SendMail;