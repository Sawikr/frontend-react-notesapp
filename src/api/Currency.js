import React, {useEffect, useState} from 'react';
import NotesService from "../service/NotesService";
import Space from "../element/Space";
import Moment from "react-moment";
import {PropagateLoader} from "react-spinners";
import {isUserLoggedIn} from "../service/LoginService";

function Currency() {
    const [currencyEUR, setCurrencyEUR] = useState([]);
    const [currencyUSD, setCurrencyUSD] = useState([]);
    const [currencyCHF, setCurrencyCHF] = useState([]);
    const [currencyGBP, setCurrencyGBP] = useState([]);
    const [loading, setLoading] = useState(false);
    const currentDate = Date.now().valueOf();
    const isAuth = isUserLoggedIn();

    useEffect(() => {
        setLoading(true);
        NotesService.getCurrencyEUR()
            .then(response => {
                console.log('Printing response!', response.data);
                setCurrencyEUR(response.data);
                setLoading(false);
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
            {
            loading ? (
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
                <h4>Currency of NBP</h4>
                <Space/>
                <x-h8>EUR/PLN:</x-h8>
                <div className="mb-3">{JSON.stringify(currencyEUR)}</div>
                <x-h8>USD/PLN:</x-h8>
                <div className="mb-3">{JSON.stringify(currencyUSD)}</div>
                <x-h8>CHF/PLN:</x-h8>
                <div className="mb-3">{JSON.stringify(currencyCHF)}</div>
                <x-h8>GBP/PLN:</x-h8>
                <div className="mb-3">{JSON.stringify(currencyGBP)}</div>
                <x-h8>Date:</x-h8>
                <div className="mb-3">
                    <Moment format="DD/MM/YYYY">{currentDate}</Moment>
                </div>
            </div>
            )}
        </div>
    );
}
export default Currency;