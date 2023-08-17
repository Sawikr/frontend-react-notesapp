import React, {useEffect, useState} from 'react';
import NotesService from "../service/NotesService";
import Space from "../element/Space";
import Moment from "react-moment";

function Currency() {

    const [currencyEUR, setCurrencyEUR] = useState([]);
    const [currencyUSD, setCurrencyUSD] = useState([]);
    const [currencyCHF, setCurrencyCHF] = useState([]);
    const [currencyGBP, setCurrencyGBP] = useState([]);

    const currentDate = Date.now().valueOf();

    useEffect(() => {
        NotesService.getCurrencyEUR()
            .then(response => {
                console.log('Printing response!', response.data);
                setCurrencyEUR(response.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, []);

    useEffect(() => {
        NotesService.getCurrencyUSD()
            .then(response => {
                console.log('Printing response!', response.data);
                setCurrencyUSD(response.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, []);


    useEffect(() => {
        NotesService.getCurrencyCHF()
            .then(response => {
                console.log('Printing response!', response.data);
                setCurrencyCHF(response.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, []);

    useEffect(() => {
        NotesService.getCurrencyGBP()
            .then(response => {
                console.log('Printing response!', response.data);
                setCurrencyGBP(response.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, []);

    return (
        <div className="main-content">
            <Space/>
            <h4>Currency of NBP</h4>
            <p>{""}</p>
            <h8>EUR/PLN:</h8>
            <div className="mb-3">{JSON.stringify(currencyEUR)}</div>
            <h8>USD/PLN:</h8>
            <div className="mb-3">{JSON.stringify(currencyUSD)}</div>
            <h8>CHF/PLN:</h8>
            <div className="mb-3">{JSON.stringify(currencyCHF)}</div>
            <h8>GBP/PLN:</h8>
            <div className="mb-3">{JSON.stringify(currencyGBP)}</div>
            <h8>Date:</h8>
            <div className="mb-3">
                <Moment format="DD/MM/YYYY">{currentDate}</Moment>
            </div>
        </div>
    );
}
export default Currency;