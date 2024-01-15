import {useState, useEffect} from 'react';
import RegisterService from '../service/RegisterService';
import Popup from 'reactjs-popup';
import Space from '../element/Space';
import {PropagateLoader} from 'react-spinners';
import Alert from '../alert/Alert';
import {navbarToken} from '../service/NavbarService';
import {useNavigate} from 'react-router';
import {useSearchParams} from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [registerTrue, setRegisterTrue] = useState(false);
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showReturnButton, setShowReturnButton] = useState(false);
    const navigate = useNavigate();
    const [queryParameters] = useSearchParams();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    const register = (e) => {
        e.preventDefault();

        if (!email || !password || !confirmPassword) {
            setErrors(true);
            return;
        } else {
            setLoading(true);
        }

        const register = {password};
        RegisterService.resetPassword(email, register)
            .then(async response => {
                //console.log(register);
                console.log('Reset password sent successfully!', response.data);
                //alert("Register is successfully!");
                setRegisterTrue(true);
                await wait(3000);
                setRegisterTrue(false);
                setLoading(false);
                navigate("/radoslaw-sawicki-frontend-react-notesapp");
            })
            .catch(async error => {
                if (password !== confirmPassword) {
                    setPasswordError(true);
                    await wait(3000);
                    setPasswordError(false);
                    setLoading(false);
                } else if (password === confirmPassword) {
                    console.log('An error occurred!', error);
                    //alert("An error occurred!");
                    setError(true);
                    await wait(3000);
                    setError(false);
                    setLoading(false);
                }
            })
    }

    function getEmailName() {
        const emailName = queryParameters.get("emailName");
        setEmail(emailName);
    }

    useEffect(() => {
        showButton().then(r => r);
        getEmailName();
    });

    function returnButton() {
        navbarToken(true);
        navigate("/radoslaw-sawicki-frontend-react-notesapp");
        window.location.reload();
    }

    async function showButton() {
        await wait(3000);
        setShowReturnButton(true);
    }

    return (
        <div className="main-content">
            {loading ? (
            <div className="text-md-left">
                {
                    (registerTrue || error || passwordError) &&
                    <Space />
                }
                {
                    registerTrue &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> Reset password is successfully!</span>
                        </div>
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
                    passwordError &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> The passwords entered are different!</span>
                        </div>
                    </Alert>
                }
                <div className="loader-container" style={{marginTop: 130}}>
                    <div className="text-center">
                        <PropagateLoader color={'#79589f'} size={20}/>
                        <Space/>
                    </div>
                </div>
            </div>
            ) : (
            <div className="login">
                <div className="text-center">
                <h5>Register to Notes App</h5>
                {!errors && <Space/>}
                {errors && <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
                </div>
                <form>
                <div className="form-group">
                    <Popup trigger={<label htmlFor="email" style={{cursor: 'pointer'}}>Email: <sup>*</sup></label>}
                           position="right center">
                        <div className="popup-body">
                            <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                        </div>
                    </Popup>
                    <input
                        id="email"
                        className="input"
                        placeholder={'Enter email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div className="form-group">
                    <Popup trigger={<label htmlFor="password" style={{cursor: 'pointer'}}>Password: <sup>*</sup></label>}
                           position="right center">
                        <div className="popup-body">
                            <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                        </div>
                    </Popup>
                    <input
                        type={isShown ? "text" : "password"}
                        id="password"
                        className="input"
                        placeholder={'Enter password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                    <div className="form-group">
                        <Popup trigger={<label htmlFor="confirm" style={{cursor: 'pointer'}}>Confirm password: <sup>*</sup></label>}
                               position="right center">
                            <div className="popup-body">
                                <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                            </div>
                        </Popup>
                        <input
                            type={isShown ? "text" : "password"}
                            id="confirm"
                            className="input"
                            placeholder={'Enter password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}>
                        </input>
                    </div>
                <label className="text-md-left" style={{color: 'black', fontSize: "11px"}}>
                    <span style={{textAlignVertical: 'center', fontSize: "8px", fontStyle: 'italic'}}>*</span> Press</label>
                <div className="text-center">
                    <button className="button-reset" onClick={(e) => register(e)}>Reset password</button>
                </div>
                </form>
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

export default ResetPassword;