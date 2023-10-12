import {isUserLoggedIn} from "../service/LoginService";

const Username = () => {

    const isAuth = isUserLoggedIn();
    const username = sessionStorage.getItem("authenticatedUser");

    return (  
        <nav className="text-md-left">
            <div>
                {
                    isAuth &&
                    <div className="username">
                        Logged in:
                        <span className="primary-color ml-1" title='Name of the logged in user' style={{cursor: "help"}}>{username}</span>
                    </div>
                }
            </div>
        </nav>
    );
}
 
export default Username;