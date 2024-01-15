import {useEffect, useState} from 'react';
import Popup from 'reactjs-popup';
import Space from '../element/Space';
import {PropagateLoader} from 'react-spinners';
import Alert from '../alert/Alert';
import {navbarToken} from '../service/NavbarService';
import {useNavigate} from 'react-router';
import * as React from 'react';
import MailService from '../service/MailService';

const PasswordChange = () => {
    const [emailName, setEmailName] = useState('');
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState(false);
    const [loading, setLoading] = useState(false);
    const [sentTrue, setSentTrue] = useState(false);
    const [showReturnButton, setShowReturnButton] = useState(false);
    const navigate = useNavigate();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    function returnButton() {
        navbarToken(true);
        navigate(-1);
    }

    async function showButton() {
        await wait(3000);
        setShowReturnButton(true);
    }

    const sendMessageIfUsernameOrEmailExists = () => {
        if (!emailName) {
            setErrors(true);
            return;
        } else {
            setLoading(true);
        }

        const sendResendEmail = {emailName};
        MailService.resend(sendResendEmail)
            .then(async response => {
                console.log('Email sent successfully:', response.data);
                console.log(sendResendEmail);
                setLoading(false);
                //alert("E-mail sent successfully to " + email + "!");
                setSentTrue(true);
                await wait(3000);
                setSentTrue(false);
            })
            .catch(async error => {
                console.log('An error occurred!', error);
                setLoading(false);
                //alert("An error occurred!");
                setError(true);
                await wait(3000);
                setError(false);
            })
    }

    useEffect(() => {
        setLoading(false);
        showButton().then(r => r);
    }, []);

    return (
        <div className="main-content">
            <div className="text-md-left">
                {
                    sentTrue &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>E-mail sent successfully to {emailName}!</div>
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
            </div>
            {loading ? (
                <div className="loader-container" style={{marginTop: 137}}>
                    <div className="text-center">
                        <PropagateLoader color={'#79589f'} size={20}/>
                        <Space/>
                    </div>
                </div>
            ) : (
            <div className="create">
                <div className="text-center">
                    <Space/>
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
                            value={emailName}
                            onChange={(e) => setEmailName(e.target.value)}
                        />
                    </div>
                    <label className="text-md-left" style={{color: 'black', fontSize: "11px"}}>
                        <span style={{textAlignVertical: 'center', fontSize: "8px", fontStyle: 'italic'}}>*</span> Press</label>
                    <div className="text-center">
                        <button className="button-add"
                            onClick={(e) => sendMessageIfUsernameOrEmailExists(e)}>Send Email</button>
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

export default PasswordChange;