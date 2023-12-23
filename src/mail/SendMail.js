import {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import MailService from '../service/MailService';
import NotesService from '../service/NotesService';
import Popup from 'reactjs-popup';
import Space from '../element/Space';
import {PropagateLoader} from 'react-spinners';
import Alert from '../alert/Alert';
import {navbarToken} from "../service/NavbarService";

const SendMail = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sentTrue, setSentTrue] = useState(false);
    const [error, setError] = useState(false);
    const [showReturnButton, setShowReturnButton] = useState(false);
    const {id} = useParams();
    const history = useHistory();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    function returnButton() {
        navbarToken(true);
        history.goBack();
    }

    async function showButton() {
        await wait(3000);
        setShowReturnButton(true);
    }

    const sendMail = (e) => {
        e.preventDefault();

        if (!email || !title || !body) {
            setErrors(true);
            return;
        } else {
            setLoading(true);
        }

        const sendEmail = {email, title, body, id};
        if (id) {
            MailService.send(sendEmail)
                .then(async response => {
                    console.log('Email sent successfully:', response.data);
                    console.log(sendEmail);
                    setLoading(false);
                    //alert("E-mail sent successfully to " + email + "!");
                    setSentTrue(true);
                    await wait(3000);
                    history.push("/notes/list");
                })
                .catch(async error => {
                    console.log('An error occurred!', error);
                    //alert("An error occurred!");
                    setError(true);
                    await wait(3000);
                })
        }
    }

    useEffect(() => {
        setLoading(true);
        if (id) {
            NotesService.get(id)
                .then(async note => {
                    setTitle(note.data.title);
                    setBody(note.data.body);
                    setLoading(false);
                    await showButton();
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                })
        }
    }, []);

    return (
        <div className="main-content">
            <div className="text-md-left">
                {
                    sentTrue &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>E-mail sent successfully to {email}!</div>
                    </Alert>
                }
                {
                    error &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> An error occurred!</span>
                        </div>
                    </Alert>
                }
                {
                    (sentTrue || error) &&
                    <Space />
                }
            </div>
            {loading ? (
                <div className="loader-container">
                    <div className="text-center">
                        <PropagateLoader color={'#79589f'} size={20}/>
                        <Space/>
                    </div>
                </div>
            ) : (
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
                            className="input"
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
                            className="input"
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
                            className="textarea"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}>
                    </textarea>
                    </div>
                    <label className="text-md-left" style={{color: 'black', fontSize: "11px"}}>
                        <span style={{textAlignVertical: 'center', fontSize: "8px", fontStyle: 'italic'}}>*</span> Press</label>
                    <div className="text-center">
                        <button className="button-add"
                            onClick={(e) => sendMail(e)}>Send Email</button>
                    </div>
                </form>
                <Space/>
            </div>
            )}
            <div className="detail-container">
                {
                    showReturnButton &&
                    <button
                        title='Back to previous page'
                        style={{background: "white"}} onClick={returnButton}>
                        <i className="fa-solid fa-arrow-turn-down fa-rotate-90 fa-lg" style={{color: "#79589f"}}/>
                    </button>
                }
            </div>
        </div>
    );
}

export default SendMail;