import {Link} from "react-router-dom";
import {isUserLoggedIn} from "../service/LoginService";

const Navbar = () => {

    const isAuth = isUserLoggedIn();

    return (  
        <nav className="navbar">
            <h2 className="primary-color">Notes App</h2>
            <div>
                {
                    isAuth &&
                    <Link to="/notes/list">Home</Link>
                }
                {
                    isAuth &&
                    <Link to="/add" className="ml-3">New Note</Link>
                }
            </div>
        </nav>
    );
}
 
export default Navbar;