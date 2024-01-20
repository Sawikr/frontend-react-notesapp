import {useEffect, useState} from 'react';
import LoginService, {getLogoutToken, isUserLoggedIn, logoutToken, saveLoggedInUser, storeToken} from '../service/LoginService';
import Popup from 'reactjs-popup';
import Space from '../element/Space';
import {PropagateLoader} from 'react-spinners';
import Alert from '../alert/Alert';
import {clickInfoToken, getClickInfoToken} from '../service/AddService';
import {useNavigate} from 'react-router';
import ModalAlert from '../alert/modal/ModalAlert';

const LoginPage = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loginTrue, setLoginTrue] = useState(false);
    const [loginFalse, setLoginFalse] = useState(false);
    const [loginProgress, setLoginProgress] = useState(false);
    const [modalAlert, setModalAlert] = useState(false);
    const [errors, setErrors] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(false);
    const [counter, setCounter] = useState(0);
    let [interval, setInterval] = useState('');
    let [showCheckPassword, setShowCheckPassword] = useState(false);
    const navigate = useNavigate();
    const isAuth = isUserLoggedIn();
    let isClickInfo = getClickInfoToken();
    let isLogout = getLogoutToken();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    const sendLogin = () => {
        let loginName = usernameOrEmail;
        const login = {loginName, isLogin};
        LoginService.sendLogin(login)
            .then(response => {
                console.log(login);
                console.log('Login sent successfully', response.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    const sendList = () => {
        let listName = usernameOrEmail;
        const list = {listName};
        LoginService.sendList(list)
            .then(response => {
                console.log(list);
                console.log('List sent successfully', response.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    async function fetchData() {
        setShowCheckPassword(false);
        if (isClickInfo === null) {
            clickInfoToken(false);
        } else if (isClickInfo.match(true)) {
            window.location.reload();
        }

        if (isLogout === null) {
            logoutToken(false);
        } else if (isLogout.match(true)) {
            setShowCheckPassword(true);
            // console.log(showCheckPassword);
        }

        if (isAuth) {
            navigate("/notes/list");
        } else {
            if (start) {
                if (counter === 1) {
                    await wait(1000);
                    setModalAlert(true);
                    return;
                }
                interval = setInterval(() => {
                    login().then(r => {
                        logoutToken(true);
                        console.log('Interval worked!');
                    })
                    setStart(false);
                    setCounter(counter + 1);
                    console.log('Counter is ' + counter + '!')
                }, 2000);
            }
            else if (counter === 1) {
                //clearInterval(interval);
                setLoading(false);
                setLoginFalse(true);
                await wait(3000);
                setLoginFalse(false);
            }
            return () => clearInterval(interval);
        }
    }

    useEffect(() => {
        fetchData().then(r => r);
    }, [isAuth, start, loginFalse, showCheckPassword, counter, modalAlert]);

    async function login() {
        if (!usernameOrEmail || !password) {
            setErrors(true);
            return;
        } else {
            //alert("Logging in... Please wait for the server's response!");
            setLoading(true);
            setLoginProgress(true);
            await wait(3000);
            setLoginProgress(false);
        }

        await LoginService.loginObj(usernameOrEmail, password)
            .then((response) => {
                setLoading(true);
                console.log('Login is successfully!', response.data);
                setLoginProgress(false);
                setLoginTrue(true);
                wait(3000);
                setLoginTrue(false);

                const token = 'Basic ' + window.btoa(usernameOrEmail + ":" + password);
                storeToken(token);
                saveLoggedInUser(usernameOrEmail);
                logoutToken(false);
                sendLogin();
                sendList();
                setLoading(false);
                setStart(false);
                window.location.reload(false);
            })
            .catch(async error => {
                console.log('An error occurred!', error);
                if (counter === 0) {
                    setStart(true);
                } else if (counter === 1) {
                    setStart(false);
                }
            })
    }

    function checkPassword() {
        navigate("/password");
    }

    return (
        <div className="main-content">
                <div className="text-left">
                    {
                        (loginTrue || loginFalse || loginProgress) &&
                        <Space />
                    }
                    {
                        loginTrue &&
                        <Alert type="info">
                            <div>
                                <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                                <span className="ml-1" style={{color: '#79589f'}}> Login is successfully!</span>
                            </div>
                        </Alert>
                    }
                    {
                        loginFalse &&
                        <Alert type="info">
                            <div>
                                <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                                <span className="ml-1" style={{color: '#79589f'}}> Login is unsuccessfully. Check your login details!</span>
                            </div>
                        </Alert>
                    }
                    {
                        loginProgress &&
                        <Alert type="info">
                            <div>
                                <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                                <span className="ml-1" style={{color: '#79589f'}}> Logging in... Please wait for the server's response!</span>
                            </div>
                        </Alert>
                    }
                    {
                        modalAlert &&
                        <ModalAlert/>
                    }
                    {/*{*/}
                    {/*    modalAlert &&*/}
                    {/*    <div className='loader-one'/>*/}
                    {/*}*/}
                </div>
                {loading ? (
                    <div className="loader-container" style={{marginTop: 137}}>
                        <div className="text-center">
                            <PropagateLoader color={'#79589f'} size={20}/>
                            <Space/>
                        </div>
                    </div>
            ) : (
            <div className="login">
                <div className="text-center">
                    <h5>Log into Notes App</h5>
                    {!errors && <Space/>}
                    {errors && <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
                </div>
                <form>
                    <div className="form-group">
                        <Popup trigger={<label htmlFor="user" style={{cursor: 'pointer'}}>User or Email: <sup>*</sup></label>}
                               position="right center">
                            <div className="popup-body">
                                <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                            </div>
                        </Popup>
                        <input
                            type="text"
                            className="input"
                            id="user"
                            placeholder={'Enter user'}
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                        />
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
                            className="input"
                            id="password"
                            placeholder={'Enter password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </div>
                    <label className="text-md-left" style={{color: 'black', fontSize: "11px"}}>
                        <span style={{textAlignVertical: 'center', fontSize: "8px", fontStyle: 'italic'}}>*</span> Press</label>
                    <div className="text-center">
                        <button className="button" onClick={(e) => login(e)}>Log In</button>
                    </div>
                    {
                        showCheckPassword &&
                        <div className="text-center">
                            <button className="check-password" onClick={(e) => checkPassword()}>Forgot password?</button>
                        </div>
                    }
                </form>
            </div>
            )}
        </div>
    );
}
 
export default LoginPage;