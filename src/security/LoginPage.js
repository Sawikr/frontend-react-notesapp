import {useState} from "react";
import {useHistory} from "react-router-dom";
import LoginService from "../service/LoginService";

const LoginPage = () => {
    const[user, setUser] = useState('');
    const[password, setPassword] = useState('');
    const[loginName, setLoginName] = useState('User');
    const[isLogin, setIsLogin] = useState(true);
    const[listName, setListName] = useState('UserList');
    const[errors, setErrors] = useState(false);
    const history = useHistory();

    let isUser = "user";
    let isPassword = "user";

    const sendLogin = () => {
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

    const login = (e) => {
        e.preventDefault();
        if (!user || !password) {
            setErrors(true);
            return;
        }

        if (isUser === user && isPassword === password) {
            window.isLogin = true;
            alert("Login is successfully!");
            sendLogin();
            sendList();
            history.push("/notes/list");
        } else {
            alert("An error occurred!");
            history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }

    return (
        <div className="create">
            <div className="text-center">
                <h5>Login to Notes App</h5>
                {errors && <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="user">User: <sup>*</sup></label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="user"
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password: <sup>*</sup></label>
                    <input
                        type="text"
                        className="form-control"
                        id="password"
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