import {Link} from 'react-router-dom';
import {clickInfoToken} from './AddService';
import Space from '../element/Space';
import {useState} from 'react';
import {useNavigate} from 'react-router';

export const clickSharesToken = (shares) => sessionStorage.setItem("shares", shares);

export const getSharesToken = () => sessionStorage.getItem("shares");

export const isClickShares = () => {
    const token = getSharesToken();
    if (token != null && token.match(false)) {
        console.log('IsClickShares return false!');
        return false;
    } else
        console.log('IsClickShares return true!');
    return true;
}

export const clickCurrencyToken = (currency) => sessionStorage.setItem("currency", currency);

export const getCurrencyToken = () => sessionStorage.getItem("currency");

export const isClickCurrency = () => {
    const token = getCurrencyToken();
    if (token != null && token.match(false)) {
        console.log('IsClickCurrency return false!');
        return false;
    } else
        console.log('IsClickCurrency return true!');
    return true;
}

export const clickWeatherToken = (weather) => sessionStorage.setItem("weather", weather);

export const getWeatherToken = () => sessionStorage.getItem("weather");

export const isClickWeather = () => {
    const token = getWeatherToken();
    if (token != null && token.match(false)) {
        console.log('IsClickWeather return false!');
        return false;
    } else
        console.log('IsClickWeather return true!');
    return true;
}

const ApiService = (props) => {
    const [active, setActive] = useState(false);
    //const history = useHistory();
    const navigate = useNavigate();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    const handleClick = async () => {
        setActive(!active);
        await wait(6000);
        setActive(false);
    };

    function handleClickShares() {
        clickInfoToken(false);
        clickCurrencyToken(true);
        navigate("/notes/shares");
        console.log('Clicked shares: ' + getSharesToken());
        window.location.reload();
    }

    function handleClickCurrency() {
        clickInfoToken(false);
        clickCurrencyToken(true);
        navigate("/notes/nbp");
        console.log('Clicked currency: ' + getCurrencyToken());
        window.location.reload();
    }

    function handleClickWeather() {
        clickInfoToken(false);
        clickWeatherToken(true);
        navigate("/notes/weather");
        console.log('Clicked weather: ' + getWeatherToken());
        window.location.reload();
    }

    return (
        <nav>
            <div
                onClick={props.handleClick}
            >
                <a
                    className="services"
                    onClick={handleClick}
                    style={{color: active ? "#79589f" : active, fontSize: 16}}
                >
                    Services
                </a>
            </div>
            {
                props.isOpen &&
                <div>
                    <Space/>
                    <Link to="/notes/shares" onClick={handleClickShares}>Stock Shares</Link>
                    <Link to="/notes/nbp" className="ml-3" onClick={handleClickCurrency}>Currency Rates</Link>
                    <Link to="/notes/weather" className="ml-3" onClick={handleClickWeather}>Weather Forecast</Link>
                </div>
            }
        </nav>
    )
}

export default ApiService;