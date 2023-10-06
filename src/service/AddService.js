import {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {isUserLoggedIn, logout} from "./LoginService";
import {clickCurrencyToken, clickWeatherToken, isClickCurrency, isClickWeather} from "../element/Add";

export const clickInfoToken = (token) => sessionStorage.setItem("token", token);

export const getClickInfoToken = () => sessionStorage.getItem("token");

export const isClickInfo = () => {
    const token = getClickInfoToken();
    if (token != null && token.match(false)) {
        console.log("IsClickInfo return false!");
        return false;
    } else
        console.log("IsClickInfo return true!");
        return true;
}

const AddService = () => {
    const [clickLogin, setClickLogin] = useState(false);
    const [clickRegister, setClickRegister] = useState(false);
    const isAuth = isUserLoggedIn();
    const isCurrency = isClickCurrency();
    const isWeather = isClickWeather();
    const history = useHistory();

    function handleClickLogin() {
        console.log('Link clicked!');
        setClickLogin(true);
        clickInfoToken(false);
        history.push("/radoslaw-sawicki-frontend-react-notesapp");
        window.location.reload();
    }

    function handleClickRegister() {
        console.log('Link clicked!');
        setClickRegister(true);
        setClickLogin(false);
        clickInfoToken(false);
        history.push("/notes/auth/register");
    }

    function handleLogout() {
        logout();
        alert("Logged out successfully!");
        history.push("/radoslaw-sawicki-frontend-react-notesapp");
        window.location.reload();
    }

    useEffect(() => {
        clickInfoToken(false);
        clickCurrencyToken(false);
        clickWeatherToken(false);
        setClickRegister(false);
        setClickLogin(false);
    }, []);

    function process() {
        let message;
        if (!isAuth) {
            if (!isClickInfo()) {
                if (clickRegister || isCurrency || isWeather) {
                    message =
                        <>
                            <Link to="/radoslaw-sawicki-frontend-react-notesapp" className="ml-3" onClick={handleClickLogin}>Login</Link>
                        </>
                }
                else if (!clickRegister && isCurrency || isWeather )
                {
                    message =
                        <>
                            <Link to="/notes/auth/register" className="ml-3" onClick={handleClickRegister}>Register</Link>
                        </>
                }
                else if (isCurrency || isWeather)
                {
                    message =
                        <>
                            <Link to="/radoslaw-sawicki-frontend-react-notesapp" className="ml-3" onClick={handleClickLogin}>Login</Link>
                        </>
                }
                else {
                    message =
                        <>
                            <Link to="/notes/auth/register" className="ml-3" onClick={handleClickRegister}>Register</Link>
                        </>
                }
            }
            else {
                message =
                    <>
                        <Link to="/notes/auth/register" className="ml-3" onClick={handleClickRegister}>Register</Link>
                    </>
            }
        } else {
            message =
                <>
                    <Link to="/radoslaw-sawicki-frontend-react-notesapp" className="ml-3" onClick={handleLogout}>Logout</Link>
                </>
        }
        return message;
    }

    return (
        <>
            {process()}
        </>
    )
}

export default AddService;