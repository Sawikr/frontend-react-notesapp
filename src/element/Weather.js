import React, {useEffect, useState} from 'react';
import NotesService from "../service/NotesService";
import Space from "./Space";
import Moment from "react-moment";

function Weather() {

    const [weather, setWeather] = useState([]);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

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
            <Space/>
            <h4>Forecast</h4>
            <p>{""}</p>
            <h8>City:</h8>
            <div className="mb-3">Poznań</div>
            <h8>Temperature:</h8>
            <div className="mb-3">{weather.temperature}</div>
            <h8>Pressure:</h8>
            <div className="mb-3">{weather.pressure}</div>
            <h8>Humidity:</h8>
            <div className="mb-3">{weather.humidity}</div>
            <h8>Wind speed:</h8>
            <div className="mb-3">{weather.windSpeed}</div><h8>Date:</h8>
            <div className="mb-3">
                <Moment format="MM/DD/YYYY">{date}</Moment>
            </div>
        </div>
    );
}
export default Weather;