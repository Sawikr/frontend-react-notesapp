import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import LoginService, {isUserLoggedIn, saveLoggedInUser} from "../service/LoginService";
import Popup from 'reactjs-popup';
import {storeToken} from "../service/LoginService";
import Space from "../element/Space";
import {PropagateLoader} from "react-spinners";

const LoginPage = () => {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [errors, setErrors] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const [start, setStart] = useState(false);
    const [counter, setCounter] = useState(0);
    let [interval, setInterval] = useState('');
    const history = useHistory();
    const isAuth = isUserLoggedIn();

    const sendLogin = () => {
        let loginName = usernameOrEmail;
        const login = {loginName, isLogin};
        LoginService.sendLogin(login)
            .then(response => {
                console.log(login);
                console.log("Login sent successfully", response.data);
            })
            .catch(error => {
                console.log("An error occurred!", error);
            })
    }

    const sendList = () => {
        let listName = usernameOrEmail;
        const list = {listName};
        LoginService.sendList(list)
            .then(response => {
                console.log(list);
                console.log("List sent successfully", response.data);
            })
            .catch(error => {
                console.log("An error occurred!", error);
            })
    }

    useEffect(() => {
        if (isAuth) {
            history.push("/notes/list");
        } else {
            if (start) {
                interval = setInterval(() => {
                    login().then(r => console.log("Interval is working!"));
                    setStart(false);
                    setCounter(counter + 1);
                    console.log("Counter is " + counter + "!")
                }, 6000);
            } else if (counter === 1) {
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }
    }, [isAuth, start]);

    async function login() {

        if (!usernameOrEmail || !password) {
            setErrors(true);
            return;
        } else {
            alert("Logging in... Please wait for the server's response!");
            setLoading(true);
        }

        await LoginService.loginObj(usernameOrEmail, password)
            .then((response) => {
                console.log("LoginObj is successfully!", response.data);

                const token = 'Basic ' + window.btoa(usernameOrEmail + ":" + password);
                storeToken(token);
                saveLoggedInUser(usernameOrEmail);
                sendLogin();
                sendList();
                setLoading(false);
                setStart(false);
                alert("Login is successfully!");
                window.location.reload(false);
            })
            .catch(error => {
                console.log("An error occurred!", error);
                if (counter === 0) {
                    setStart(true);
                } else if (counter === 1) {
                    alert("Login is unsuccessfully. Check your username and password!");
                    setStart(false);
                    setLoading(false);
                }
            })
    }

    return (
        <div className="main-content">
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
                            className="form-control"
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
                            className="form-control"
                            id="password"
                            placeholder={'Enter password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </div>
                    <label className="text-md-left" style={{color: 'black', fontSize: "11px"}}>
                        <span style={{textAlignVertical: 'center', fontSize: "8px", fontStyle: 'italic'}}>*</span> Press</label>
                    <div className="text-center">
                        <button onClick={(e) => login(e)}>Log In</button>
                    </div>
                </form>
            </div>
            )}
        </div>
    );
}
 
export default LoginPage;