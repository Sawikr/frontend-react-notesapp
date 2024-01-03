import React from 'react';
import logo from '../assets/launcherWeb.ico';
import {Image} from 'primereact/image';

function InfoLogo() {
    console.log(logo);
    return (
        <div>
            <Image src={logo} alt='Notes App logo' height={22} width={22} layout="responsive" loading="lazy"/>
        </div>
    );
}

export default InfoLogo;
