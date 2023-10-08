import {Link, useHistory} from "react-router-dom";
import {clickInfoToken} from "./AddService";

export const clickCurrencyToken = (currency) => sessionStorage.setItem("currency", currency);

export const getCurrencyToken = () => sessionStorage.getItem("currency");

export const isClickCurrency = () => {
    const token = getCurrencyToken();
    if (token != null && token.match(false)) {
        console.log("IsClickCurrency return false!");
        return false;
    } else
        console.log("IsClickCurrency return true!");
    return true;
}

export const clickWeatherToken = (weather) => sessionStorage.setItem("weather", weather);

export const getWeatherToken = () => sessionStorage.getItem("weather");

export const isClickWeather = () => {
    const token = getWeatherToken();
    if (token != null && token.match(false)) {
        console.log("IsClickWeather return false!");
        return false;
    } else
        console.log("IsClickWeather return true!");
    return true;
}

const ApiService = () => {

    const history = useHistory();

    function handleClickCurrency() {
        clickInfoToken(false);
        clickCurrencyToken(true);
        history.push("/notes/nbp");
        console.log('Clicked currency: ' + getCurrencyToken());
        window.location.reload();
    }

    function handleClickWeather() {
        clickInfoToken(false);
        clickWeatherToken(true);
        history.push("/notes/weather");
        console.log('Clicked weather: ' + getWeatherToken());
        window.location.reload();
    }

    return (
        <div>
            <Link to="/notes/nbp" onClick={handleClickCurrency}>Currency NBP</Link>
            <Link to="/notes/weather" className="ml-3" onClick={handleClickWeather}>Weather</Link>
        </div>
    )
}

export default ApiService;