import {Link, useHistory} from 'react-router-dom';
import {isUserLoggedIn} from '../service/LoginService';
import SettingsMenu from '../menu/SettingsMenu';
import {newNoteToken} from '../service/AddNoteService';
import {navbarToken} from '../service/NavbarService';

const Navbar = () => {
    const isAuth = isUserLoggedIn();
    const history = useHistory();

    function handleClickHome() {
        console.log('Home is clicked!');
        navbarToken(true);
        history.push("/notes/list");
        window.location.reload();
    }

    function handleClickNewNote() {
        newNoteToken(true);
        console.log('New Note is clicked!');
        navbarToken(true);
        history.push("/add");
        window.location.reload();
    }

    return (
        <nav className="navbar">
            <h2
                title='Version 1. 0. 0.'
                className="primary-color" style={{cursor: "help"}}>Notes App
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
                {
                    isAuth &&
                    <SettingsMenu/>
                }
            </div>
        </nav>
    );
}
 
export default Navbar;