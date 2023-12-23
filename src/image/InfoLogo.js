import React from 'react';
import logo from '../assets/launcherWeb.ico'

function InfoLogo() {
    console.log(logo);
    return (
        <div>
            <img src={logo} alt='Notes App logo' height={22} width={22}/>
        </div>
    );
}

export default InfoLogo;
