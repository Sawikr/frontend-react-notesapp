import Space from './Space';
import Logo from '../image/Logo';
import React, {useState} from 'react';
import {navbarToken} from '../service/NavbarService';
import {useEffect} from 'react';
import {clickInfoToken} from '../service/AddService';
import {useNavigate} from 'react-router';
import {Link} from 'react-router-dom';
import ModalAlert from '../alert/modal/ModalLoginAlert';

const Copyright = () => {
    const [showReturnButton, setShowReturnButton] = useState(false);
    const [showLoginInfo, setShowLoginInfo] = useState(false);
    const [modalAlert, setModalAlert] = useState(false);
    const [start, setStart] = useState(false);
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    function returnButton() {
        navbarToken(true);
        clickInfoToken(true);
        navigate("/radoslaw-sawicki-frontend-react-notesapp");
    }

    async function handleClick() {
        setModalAlert(!modalAlert);
        setStart(true);
    }

    async function showButton() {
        await wait(3000);
        setShowReturnButton(true);
    }

    async function showLogin() {
        await wait(5000);
        setShowLoginInfo(true);
    }

    useEffect(() => {
        if (start === true) {
            setModalAlert(true);
        }
        showButton().then(r => r);
        showLogin().then(r => r);
    }, [start, modalAlert]);

    return (
        <div className="main-content">
            <form className="text-center">
                <Space/>
                <h6 className="text-center">
                    <span className="primary-color ml-1">Copyright</span>
                    : ©{currentYear} Radosław Sawicki
                </h6>
                <Space/>
                <Logo/>
                <Space/>
                <h6 className="text-center">
                    <span className="primary-color ml-1">Notes App</span>
                    : Version 1.0.0</h6>
                <h6 className="text-center">
                    <span className="primary-color ml-1">Release date</span>
                    : September 1, 2023</h6>
                <Space/>
                <Space/>
                <h6 className="text-center">Description:</h6>
                <p> </p>
                <label>
                    <x-h7 className="text-center" style={{fontStyle: 'italic'}}>Notes App is a REST API based application. This is an application for
                        creating, editing, deleting and emailing personal notes. The application also includes current
                        exchange rates and weather forecast.</x-h7>
                </label>
                <div className="login-alert" style={{justifyContent: "center"}}>
                {
                    showLoginInfo &&
                    <x-h7>
                        <Space/>
                        More information on logging in can be found
                        <span className="info-alert">
                            <Link className="primary-color" title='NotesApp info'
                                  onClick={handleClick}> here
                            </Link>.
                        </span>
                    </x-h7>
                }
                {
                    modalAlert &&
                    <ModalAlert/>
                }
                </div>
            </form>
            <Space/>
            {
                showReturnButton &&
                <button
                    title='Back to previous page'
                    style={{background: "white"}} onClick={returnButton}>
                    <i className="fa-solid fa-arrow-turn-down fa-rotate-90 fa-lg" style={{color: "#79589f"}}/>
                </button>
            }
        </div>
    )
}

export default Copyright;