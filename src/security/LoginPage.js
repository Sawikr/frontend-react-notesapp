import {useState} from "react";
import {useHistory} from "react-router-dom";
import LoginService, {saveLoggedInUser} from "../service/LoginService";
import {storeToken} from "../service/LoginService";

const LoginPage = () => {
    const[usernameOrEmail, setUsernameOrEmail] = useState('');
    const[password, setPassword] = useState('');
    const[isLogin, setIsLogin] = useState(true);
    const[errors, setErrors] = useState(false);
    const history = useHistory();

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

    async function login(e) {
        e.preventDefault();
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

                alert("Login is successfully!");
                history.push("/notes/list");

                window.location.reload();
            })
            .catch(error => {
                console.log("An error occurred!", error);
                history.push("/radoslaw-sawicki-frontend-react-notesapp");
            })
    }

    return (
        <div className="create">
            <div className="text-center">
                <h5>Login to Notes App</h5>
                {errors && <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="user">User or Email: <sup>*</sup></label>
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
                    <label htmlFor="password">Password: <sup>*</sup></label>
                    <input
                        type="text"
                        className="form-control"
                        id="password"
                        placeholder={'Enter password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div className="text-center">
                    <button onClick={(e) => login(e)}>Login</button>
                </div>
            </form>
        </div>
    );
}
 
export default LoginPage;