import {Link, useHistory, useLocation} from "react-router-dom";
import {useState} from "react";
import {clickInfoToken, isClickInfo} from "../service/AddService";

const Info = () => {
    const [clickLink, setClickLink] = useState(false);
    const currentYear = new Date().getFullYear();
    const history = useHistory();

    function handleClick() {
        console.log('Link clicked!');
        setClickLink(true);
        clickInfoToken(true);
        isClickInfo();
        history.push("/info");
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
            <div className="info">
                <p></p>
                <div className="text-center">
                    {
                        !clickLink &&
                        <Link to="/info" className="info primary-color font-italic" onClick={handleClick}>
                            Copyright ©{currentYear} Radosław Sawicki</Link>
                    }
                </div>
            </div>
        </nav>
    );
}
 
export default Info;