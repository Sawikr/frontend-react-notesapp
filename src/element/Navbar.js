import {Link, useHistory} from "react-router-dom";
import {isUserLoggedIn} from "../service/LoginService";

const Navbar = () => {
    const isAuth = isUserLoggedIn();
    const history = useHistory();

    function handleClickHome() {
        console.log('Link clicked!');
        history.push("/notes/list");
        window.location.reload();
    }

    function handleClickNewNote() {
        console.log('Link clicked!');
        history.push("/add");
        window.location.reload();
    }

    return (
        <nav className="navbar">
            <h2
                title='Version 1. 0. 0.'
                className="primary-color">Notes App
            </h2>
         <div>
                {
                    isAuth &&
                    <Link to="/notes/list" title='Note list home page'
                          onClick={handleClickHome}>Home</Link>
                }
                {
                    isAuth &&
                    <Link to="/add" className="ml-3" onClick={handleClickNewNote}>New Note</Link>
                }
            </div>
        </nav>
    );
}
 
export default Navbar;