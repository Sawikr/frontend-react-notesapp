import {Link} from "react-router-dom";
import {isUserLoggedIn} from "../service/LoginService";

const Add = () => {

    const isAuth = isUserLoggedIn();

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
            </div>
        </nav>
    );
}
 
export default Add;