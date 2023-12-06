import {useState} from 'react';
import RegisterService from '../service/RegisterService';
import Popup from 'reactjs-popup';
import {useHistory} from 'react-router-dom';
import Space from '../element/Space';
import {PropagateLoader} from 'react-spinners';
import Alert from '../alert/Alert';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerTrue, setRegisterTrue] = useState(false);
    const [error, setError] = useState(false);
    const [errors, setErrors] = useState(false);
    const [isShown, setIsShown] = useState(false);
    const [loading, setLoading] = useState(false);
    const history = useHistory();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    const register = (e) => {
        e.preventDefault();

        if (!name || !username || !email || !password) {
            setErrors(true);
            return;
        } else {
            setLoading(true);
        }

        const register = {name, username, email, password};
        RegisterService.register(register)
            .then(async response => {
                console.log(register);
                console.log('Register sent successfully!', response.data);
                setLoading(false);
                //alert("Register is successfully!");
                setRegisterTrue(true);
                await wait(3000);
                history.push("/radoslaw-sawicki-frontend-react-notesapp");
            })
            .catch(async error => {
                console.log('An error occurred!', error);
                //alert("An error occurred!");
                setError(true);
                await wait(3000);
            })
    }

    return (
        <div className="main-content">
            {loading ? (
            <div className="text-md-left">
                {
                    (registerTrue || error) &&
                    <Space />
                }
                {
                    registerTrue &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> Register is successfully!</span>
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
                    <Popup trigger={<label htmlFor="name" style={{cursor: 'pointer'}}>Name: <sup>*</sup></label>}
                           position="right center">
                        <div className="popup-body">
                            <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                        </div>
                    </Popup>
                    <input
                        type="text"
                        className="input"
                        id="name"
                        placeholder={'Enter name'}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <Popup trigger={ <label htmlFor="body" style={{cursor: 'pointer'}}>Username: <sup>*</sup></label>}
                           position="right center">
                        <div className="popup-body">
                            <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                        </div>
                    </Popup>
                    <input
                        id="body"
                        className="input"
                        placeholder={'Enter username'}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}>
                    </input>
                </div>
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
                <label className="text-md-left" style={{color: 'black', fontSize: "11px"}}>
                    <span style={{textAlignVertical: 'center', fontSize: "8px", fontStyle: 'italic'}}>*</span> Press</label>
                <div className="text-center">
                    <button className="button-add" onClick={(e) => register(e)}>Register</button>
                </div>
                </form>
            </div>
            )}
        </div>
    );
}

export default RegisterPage;