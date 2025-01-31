import React, {useEffect, useState} from 'react';
import NotesService from '../service/NotesService';
import Space from '../element/Space';
import Moment from 'react-moment';
import {PropagateLoader} from 'react-spinners';
import {isUserLoggedIn} from '../service/LoginService';
import {navbarToken} from '../service/NavbarService';
import {useNavigate} from 'react-router';

function Shares() {
    const [share1, setShare1] = useState([]);
    const [share2, setShare2] = useState([]);
    const [share3, setShare3] = useState([]);
    const [share4, setShare4] = useState([]);
    const [share5, setShare5] = useState([]);
    const [share6, setShare6] = useState([]);
    const [change1, setChange1] = useState(0);
    const [change2, setChange2] = useState(0);
    const [change3, setChange3] = useState(0);
    const [change4, setChange4] = useState(0);
    const [change5, setChange5] = useState(0);
    const [change6, setChange6] = useState(0);
    const open = useState(0);
    const [close, setClose] = useState(0);
    const change = useState(0);
    const [changeColor1, setChangeColor1] = useState(true);
    const [changeColor2, setChangeColor2] = useState(true);
    const [changeColor3, setChangeColor3] = useState(true);
    const [changeColor4, setChangeColor4] = useState(true);
    const [changeColor5, setChangeColor5] = useState(true);
    const [changeColor6, setChangeColor6] = useState(true);
    const [loading, setLoading] = useState(true);
    const [showReturnButton, setShowReturnButton] = useState(false);
    const currentDate = Date.now().valueOf();
    const isAuth = isUserLoggedIn();
    const navigate = useNavigate();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    function returnButton() {
        navbarToken(true);
        navigate(-2);
    }

    async function showButton() {
        await wait(3000);
        setShowReturnButton(true);
    }

    function getChange(response) {
        let close = response.data.data[0].close;
        let openClose = response.data.data[1].close;
        let change = (close - openClose) / openClose * 100;
        return change;
    }

    function color(change) {
        if (change > 0) {
            return true;
        } else
            return false;
    }

    function getData1() {
        NotesService.getShare1()
            .then(async response => {
                console.log('Printing response!', response.data);

                const closeResponse = response.data.data[0].close;
                //console.log('Close is ' + closeResponse + '!');

                setShare1(closeResponse);

                let change = getChange(response);
                setChange1(change);
                setChangeColor1(color(change));

                setLoading(false);
                await showButton();
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    function getData2() {
        NotesService.getShare2()
            .then(response => {
                console.log('Printing response!', response.data);

                const closeResponse = response.data.data[0].close;
                //console.log('Close is ' + closeResponse + '!');

                let change = getChange(response);
                setChange2(change);
                setChangeColor2(color(change));

                setShare2(closeResponse);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    function getData3() {
        NotesService.getShare3()
            .then(response => {
                console.log('Printing response!', response.data);

                const closeResponse = response.data.data[0].close;
                //console.log('Close is ' + closeResponse + '!');

                let change = getChange(response);
                setChange3(change);
                setChangeColor3(color(change));

                setShare3(closeResponse);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    function getData4() {
        NotesService.getShare4()
            .then(response => {
                console.log('Printing response!', response.data);

                const closeResponse = response.data.data[0].close;
                //console.log('Close is ' + closeResponse + '!');

                let change = getChange(response);
                setChange4(change);
                setChangeColor4(color(change));

                setShare4(closeResponse);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    function getData5() {
        NotesService.getShare5()
            .then(response => {
                console.log('Printing response!', response.data);

                const closeResponse = response.data.data[0].close;
                //console.log('Close is ' + closeResponse + '!');

                let change = getChange(response);
                setChange5(change);
                setChangeColor5(color(change));

                setShare5(closeResponse);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    function getData6() {
        NotesService.getShare6()
            .then(response => {
                console.log('Printing response!', response.data);

                const closeResponse = response.data.data[0].close;
                //console.log('Close is ' + closeResponse + '!');

                let change = getChange(response);
                setChange6(change);
                setChangeColor6(color(change));

                setShare6(closeResponse);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    useEffect(() => {
        getData1();
        getData2();
        getData3();
        getData4();
        getData5();
        getData6();
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
                <h4>Stock Shares</h4>
                <Space/>
                <x-h8>NASDAQ:</x-h8>
                <div className="row mb-3 ml-auto">
                    <div className="column left">
                    {JSON.stringify(share1)}
                    </div>
                    <div className="column right">
                        {changeColor1 &&
                            <i className="ml-1" style={{color: "green"}}>{change1.toFixed(2)}</i>
                        }
                        {!changeColor1 &&
                            <i className="ml-1" style={{color: "red"}}>{change1.toFixed(2)}</i>
                        } %
                    </div>
                </div>
                <x-h8>S&P500:</x-h8>
                <div className="row mb-3 ml-auto">
                    <div className="column left">
                        {JSON.stringify(share2)}
                    </div>
                    <div className="column right">
                        {changeColor2 &&
                            <i className="ml-1" style={{color: "green"}}>{change2.toFixed(2)}</i>
                        }
                        {!changeColor2 &&
                            <i className="ml-1" style={{color: "red"}}>{change2.toFixed(2)}</i>
                        } %
                    </div>
                </div>
                <x-h8>WIG20:</x-h8>
                <div className="row mb-3 ml-auto">
                <div className="column left">
                    {JSON.stringify(share3)}
                </div>
                <div className="column right">
                    {changeColor3 &&
                        <i className="ml-1" style={{color: "green"}}>{change3.toFixed(2)}</i>
                    }
                    {!changeColor3 &&
                        <i className="ml-1" style={{color: "red"}}>{change3.toFixed(2)}</i>
                    } %
                </div>
                </div>
                <x-h8>NVIDIA:</x-h8>
                <div className="row mb-3 ml-auto">
                    <div className="column left">
                        {JSON.stringify(share4)}
                    </div>
                    <div className="column right">
                        {changeColor4 &&
                            <i className="ml-1" style={{color: "green"}}>{change4.toFixed(2)}</i>
                        }
                        {!changeColor4 &&
                            <i className="ml-1" style={{color: "red"}}>{change4.toFixed(2)}</i>
                        } %
                    </div>
                </div>
                <x-h8>Alphabet:</x-h8>
                <div className="row mb-3 ml-auto">
                    <div className="column left">
                        {JSON.stringify(share5)}
                    </div>
                    <div className="column right">
                        {changeColor5 &&
                            <i className="ml-1" style={{color: "green"}}>{change5.toFixed(2)}</i>
                        }
                        {!changeColor5 &&
                            <i className="ml-1" style={{color: "red"}}>{change5.toFixed(2)}</i>
                        } %
                    </div>
                </div>
                <x-h8>Microsoft:</x-h8>
                <div className="row mb-3 ml-auto">
                    <div className="column left">
                        {JSON.stringify(share6)}
                    </div>
                    <div className="column right">
                        {changeColor6 &&
                            <i className="ml-1" style={{color: "green"}}>{change6.toFixed(2)}</i>
                        }
                        {!changeColor6 &&
                            <i className="ml-1" style={{color: "red"}}>{change6.toFixed(2)}</i>
                        } %
                    </div>
                </div>
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
export default Shares;