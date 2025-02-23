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
    const [open1, setOpen1] = useState([]);
    const [open2, setOpen2] = useState([]);
    const [open3, setOpen3] = useState([]);
    const [close1, setClose1] = useState([]);
    const [close2, setClose2] = useState([]);
    const [close3, setClose3] = useState([]);
    const [change1, setChange1] = useState(0);
    const [change2, setChange2] = useState(0);
    const [change3, setChange3] = useState(0);
    const [volume1, setVolume1] = useState(0);
    const [volume2, setVolume2] = useState(0);
    const [volume3, setVolume3] = useState(0);
    const open = useState(0);
    const [close, setClose] = useState(0);
    const change = useState(0);
    const [changeColor1, setChangeColor1] = useState(true);
    const [changeColor2, setChangeColor2] = useState(true);
    const [changeColor3, setChangeColor3] = useState(true);
    const [loading, setLoading] = useState(true);
    const [loadingOne, setLoadingOne] = useState(false);
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
                const openResponse = response.data.data[0].open;
                const volumeResponse = response.data.data[0].volume;
                //console.log('Close is ' + closeResponse + '!');

                setClose1(closeResponse);

                let change = getChange(response);
                setChange1(change);
                setOpen1(openResponse);
                setVolume1(volumeResponse);
                setChangeColor1(color(change));

                setLoadingOne(false);
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
                const openResponse = response.data.data[1].open;
                const volumeResponse = response.data.data[0].volume;
                //console.log('Close is ' + closeResponse + '!');

                let change = getChange(response);
                setChange2(change);
                setOpen2(openResponse);
                setVolume2(volumeResponse);
                setChangeColor2(color(change));

                setClose2(closeResponse);
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
                const openResponse = response.data.data[1].open;
                const volumeResponse = response.data.data[0].volume;
                //console.log('Close is ' + closeResponse + '!');

                let change = getChange(response);
                setChange3(change);
                setOpen3(openResponse);
                setVolume3(volumeResponse);
                setChangeColor3(color(change));

                setClose3(closeResponse);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    useEffect(() => {
        getData1();
        getData2();
        getData3();
    }, []);

    return (
        <div className="main-content">
            {
            loadingOne ? (
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
                <x-h8>
                    <div className="row mb-2 ml-auto">
                        NASDAQ:
                    </div>
                </x-h8>
                <div className="row mb-4 ml-auto">
                    <div className="column left">
                        Close: {JSON.stringify(close1)}
                        <div>
                            Open: {JSON.stringify(open1)}
                        </div>
                        <div>
                            Volume: {JSON.stringify(volume1)}
                        </div>
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
                <x-h8>
                    <div className="row mb-2 ml-auto">
                        S&P500:
                    </div>
                </x-h8>
                <div className="row mb-4 ml-auto">
                    <div className="column left">
                        Close: {JSON.stringify(close2)}
                        <div>
                            Open: {JSON.stringify(open2)}
                        </div>
                        <div>
                            Volume: {JSON.stringify(volume2)}
                        </div>
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
                <x-h8>
                    <div className="row mb-2 ml-auto">
                        WIG20:
                    </div>
                </x-h8>
                <div className="row mb-4 ml-auto">
                <div className="column left">
                    Close: {JSON.stringify(close3)}
                    <div>
                        Open: {JSON.stringify(open3)}
                    </div>
                    <div>
                        Volume: {JSON.stringify(volume3)}
                    </div>
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