import {Link, useHistory} from "react-router-dom";
import {isUserLoggedIn, logout} from "../service/LoginService";

const Add = () => {
    const isAuth = isUserLoggedIn();
    const history = useHistory();

    function handleLogout() {
        logout();
        history.push("/radoslaw-sawicki-frontend-react-notesapp");
        window.location.reload();
    }

    function handleClickLogin() {
        console.log('Link clicked!');
        history.push("/radoslaw-sawicki-frontend-react-notesapp");
        window.location.reload();
    }

    function handleClickRegister() {
        console.log('Link clicked!');
        history.push("/notes/auth/register");
        window.location.reload();
    }

    function handleClickCurrency() {
        console.log('Link clicked!');
        history.push("/notes/nbp");
        window.location.reload();
    }

    function handleClickWeather() {
        console.log('Link clicked!');
        history.push("/notes/weather");
        window.location.reload();
    }

    return (  
        <nav className="navbar">
            <div>
                <Link to="/notes/nbp" onClick={handleClickCurrency}>Currency NBP</Link>
                <Link to="/notes/weather" className="ml-3" onClick={handleClickWeather}>Weather</Link>
            </div>
            <div>
                {
                    !isAuth &&
                    <Link to="/notes/auth/register" className="ml-3" onClick={handleClickRegister}>Register</Link>
                }
                {
                    !isAuth &&
                    <Link to="/radoslaw-sawicki-frontend-react-notesapp" className="ml-3" onClick={handleClickLogin}>Login</Link>
                }
                {
                    isAuth &&
                    <Link to="/radoslaw-sawicki-frontend-react-notesapp" className="ml-3" onClick={handleLogout}>Logout</Link>
                }
            </div>
        </nav>
    );
}
 
export default Add;