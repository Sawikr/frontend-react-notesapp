import React, {useEffect, useState} from 'react';
import NotesService from "../service/NotesService";

function Currency() {

    const [currencyEUR, setCurrencyEUR] = useState([]);
    const [currencyUSD, setCurrencyUSD] = useState([]);
    const [currencyCHF, setCurrencyCHF] = useState([]);
    const [currencyGBP, setCurrencyGBP] = useState([]);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

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
            <h4>Currency of NBP</h4>
            <h8>EUR/PLN:</h8>
            <div className="mb-3">{JSON.stringify(currencyEUR)}</div>
            <h8>USD/PLN:</h8>
            <div className="mb-3">{JSON.stringify(currencyUSD)}</div>
            <h8>CHF/PLN:</h8>
            <div className="mb-3">{JSON.stringify(currencyCHF)}</div>
            <h8>GBP/PLN:</h8>
            <div className="mb-3">{JSON.stringify(currencyGBP)}</div>
            <h8>Date:</h8>
            <div className="mb-3">{date}</div>
        </div>
    );
}
export default Currency;