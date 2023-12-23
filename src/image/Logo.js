import React from 'react';
import logo from '../assets/launcherWeb.ico'

function Logo() {
    console.log(logo);
    return (
        <div>
            <img src={logo} alt='Notes App logo' height={100} width={100}/>
        </div>
    );
}

export default Logo;
