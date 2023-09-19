import {useState} from "react";
import RegisterService from "../service/RegisterService";
import {useHistory} from "react-router-dom";

const RegisterPage = () => {
    const[name, setName] = useState('');
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[errors, setErrors] = useState(false);
    const history = useHistory();

    const register = (e) => {
        e.preventDefault();
        if (!name || !username || !email || !password) {
            setErrors(true);
            return;
        }

        const register = {name, username, email, password};
        RegisterService.register(register)
            .then(response => {
                console.log(register);
                console.log("Register sent successfully!", response.data);
                history.push("/radoslaw-sawicki-frontend-react-notesapp");
            })
            .catch(error => {
                console.log("An error occurred!", error);
            })
    }

    return (
        <div className="login">
            <div className="text-center">
                <h5>Register to Notes App</h5>
                &nbsp;
                {errors && <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Name: <sup>*</sup></label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder={'Enter name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Username: <sup>*</sup></label>
                    <input
                        id="body"
                        className="form-control"
                        placeholder={'Enter username'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}>
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Email: <sup>*</sup></label>
                    <input
                        id="body"
                        className="form-control"
                        placeholder={'Enter email'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="body">Password: <sup>*</sup></label>
                    <input
                        id="body"
                        className="form-control"
                        placeholder={'Enter password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div className="text-center">
                    <button onClick={(e) => register(e)}>Register</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;