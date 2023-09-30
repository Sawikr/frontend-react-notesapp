import {Link} from "react-router-dom";

const Info = () => {

    const currentYear = new Date().getFullYear();

    return (
        <nav>
            <div className="info">
                <p></p>
                <div className="text-center">
                    <Link to="/info" className="info primary-color font-italic">Copyright ©{currentYear} Radosław Sawicki</Link>
                </div>
            </div>
        </nav>
    );
}
 
export default Info;