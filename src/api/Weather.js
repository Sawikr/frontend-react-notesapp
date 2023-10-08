import React, {useEffect, useState} from 'react';
import NotesService from "../service/NotesService";
import Space from "../element/Space";
import Moment from "react-moment";

function Weather() {
    const [weather, setWeather] = useState([]);
    const currentDate = Date.now().valueOf();

    useEffect(() => {
        NotesService.getWeather()
            .then(response => {
                console.log('Printing response!', response.data);
                setWeather(response.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, []);

    return (
        <div className="main-content">
            <h4>Weather forecast</h4>
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
    );
}
export default Weather;