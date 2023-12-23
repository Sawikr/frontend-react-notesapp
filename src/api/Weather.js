import React, {useEffect, useState} from 'react';
import NotesService from '../service/NotesService';
import Space from '../element/Space';
import Moment from 'react-moment';
import {PropagateLoader} from 'react-spinners';
import {isUserLoggedIn} from '../service/LoginService';
import {navbarToken} from '../service/NavbarService';
import {useHistory} from 'react-router-dom';

function Weather() {
    const [weather, setWeather] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showReturnButton, setShowReturnButton] = useState(false);
    const currentDate = Date.now().valueOf();
    const isAuth = isUserLoggedIn();
    const history = useHistory();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    function returnButton() {
        navbarToken(true);
        history.goBack();
    }

    async function showButton() {
        await wait(3000);
        setShowReturnButton(true);
    }

    useEffect(() => {
        NotesService.getWeather()
            .then(async response => {
                console.log('Printing response!', response.data);
                setWeather(response.data);
                setLoading(false);
                await showButton();
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, []);

    return (
        <div className="main-content">
            {loading ? (
                <div>
                    {!isAuth &&
                        <div className="loader-container" style={{marginTop: 137}}>
                            <div className="text-center">
                                <PropagateLoader color={'#79589f'} size={20}/>
                                <Space/>
                            </div>
                        </div>
                    }
                    {isAuth &&
                        <div className="loader-container" style={{marginTop: 77}}>
                            <div className="text-center">
                                <PropagateLoader color={'#79589f'} size={20}/>
                                <Space/>
                            </div>
                        </div>
                    }
                </div>
            ) : (
            <div className="main-content">
                <h4>Weather Forecast</h4>
                <Space/>
                <x-h8>City:</x-h8>
                <div className="mb-3">Poznań</div>
                <x-h8>Temperature:</x-h8>
                <div className="mb-3">{weather.temperature}</div>
                <x-h8>Pressure:</x-h8>
                <div className="mb-3">{weather.pressure}</div>
                <x-h8>Humidity:</x-h8>
                <div className="mb-3">{weather.humidity}</div>
                <x-h8>Wind speed:</x-h8>
                <div className="mb-3">{weather.windSpeed}</div><x-h8>Date:</x-h8>
                <div className="mb-3">
                    <Moment format="DD/MM/YYYY">{currentDate}</Moment>
                </div>
            </div>
            )}
            {
                showReturnButton &&
                <button
                    title='Back to previous page'
                    style={{background: "white"}} onClick={returnButton}>
                    <i className="fa-solid fa-arrow-turn-down fa-rotate-90 fa-lg" style={{color: "#79589f"}}/>
                </button>
            }
        </div>
    );
}
export default Weather;