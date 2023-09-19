import {isUserLoggedIn} from "../service/LoginService";

const Username = () => {

    const isAuth = isUserLoggedIn();
    const username = sessionStorage.getItem("authenticatedUser");

    return (  
        <nav className="text-md-left">
            <div>
                {
                    isAuth &&
                    <h2 className="username primary-color">{username}</h2>
                }
            </div>
        </nav>
    );
}
 
export default Username;