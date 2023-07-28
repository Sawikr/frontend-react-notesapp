import {Link} from "react-router-dom";

const Add = () => {
    return (  
        <nav className="navbar">
            <div>
                <Link to="/nbp">NBP</Link>
                <Link to="/weather" className="ml-3">Weather</Link>
            </div>
        </nav>
    );
}
 
export default Add;