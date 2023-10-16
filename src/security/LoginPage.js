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
            history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }, []);

    async function login(e) {
        e.preventDefault();

        alert("Logging in... Please wait for the server's response!");
        setLoading(true);

        if (!usernameOrEmail || !password) {
            setErrors(true);
            return;
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
                alert("Login is successfully!");
                window.location.reload(false);
            })
            .catch(error => {
                console.log("An error occurred!", error);
                alert("Login is unsuccessfully. Check your username and password!");
            })
    }

    return (
        <div className="login">
            {loading ? (
                <div className="loader-container" style={{marginTop: 130}}>
                    <div className="text-center">
                        <PropagateLoader color={'#79589f'} size={20}/>
                        <Space/>
                    </div>
                </div>
            ) : (
            <div className="login">
                <div className="text-center">
                    <h5>Login to Notes App</h5>
                    {!errors && <Space/>}
                    {errors && <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
                </div>
                <form>
                    <div className="form-group">
                        <Popup trigger={<label htmlFor="user">User or Email: <sup>*</sup></label>}
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
                        <Popup trigger={<label htmlFor="password">Password: <sup>*</sup></label>}
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
                        <button onClick={(e) => login(e)}>Login</button>
                    </div>
                </form>
            </div>
            )}
        </div>
    );
}
 
export default LoginPage;