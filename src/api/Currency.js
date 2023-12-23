import React, {useEffect, useState} from 'react';
import NotesService from '../service/NotesService';
import Space from '../element/Space';
import Moment from 'react-moment';
import {PropagateLoader} from 'react-spinners';
import {isUserLoggedIn} from '../service/LoginService';
import {navbarToken} from '../service/NavbarService';
import {useHistory} from 'react-router-dom';

function Currency() {
    const [currencyEUR, setCurrencyEUR] = useState([]);
    const [currencyUSD, setCurrencyUSD] = useState([]);
    const [currencyCHF, setCurrencyCHF] = useState([]);
    const [currencyGBP, setCurrencyGBP] = useState([]);
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
        NotesService.getCurrencyEUR()
            .then(async response => {
                console.log('Printing response!', response.data);
                setCurrencyEUR(response.data);
                setLoading(false);
                await showButton();
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
                <h4>Currency Rates</h4>
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
export default Currency;