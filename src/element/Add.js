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

    return (  
        <nav className="navbar">
            <div>
                <Link to="/notes/nbp">Currency NBP</Link>
                <Link to="/notes/weather" className="ml-3">Weather</Link>
            </div>
            <div>
                {
                    !isAuth &&
                    <Link to="/notes/auth/register" className="ml-3">Register</Link>
                }
                {
                    !isAuth &&
                    <Link to="/radoslaw-sawicki-frontend-react-notesapp" className="ml-3">Login</Link>
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