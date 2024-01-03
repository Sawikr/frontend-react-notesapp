import {Link, useLocation} from 'react-router-dom';
import {useState} from 'react';
import {clickInfoToken, isClickInfo} from '../service/AddService';
import React from 'react';
import InfoLogo from '../image/InfoLogo';
import {useNavigate} from 'react-router';

const Info = () => {
    const [clickLink, setClickLink] = useState(false);
    const currentYear = new Date().getFullYear();
    const navigate = useNavigate();

    function handleClick() {
        console.log('Link clicked!');
        setClickLink(true);
        clickInfoToken(true);
        isClickInfo();
        navigate("/info");
    }

    //Additional function
    const LinkInfo = () => {
        const location = useLocation();
        const [name, setName] = useState(location.pathname);
        console.log(location);
        return name;
    }

    return (
        <nav>
            <p/>
            <div className="info">
                <div className="info-logo">
                    <div className="info-logo-one">
                        {
                            !clickLink &&
                            <InfoLogo/>
                        }
                    </div>
                    <div className="info-logo-two">
                        {
                            !clickLink &&
                            <Link to="/info" className="primary-color font-italic" title='Notes App info'
                                  onClick={handleClick}>Copyright ©{currentYear} Radosław Sawicki
                            </Link>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}
 
export default Info;