import {Link} from "react-router-dom";

const Add = () => {
    return (  
        <nav className="navbar">
            <div>
                <Link to="/notes/nbp">Currency NBP</Link>
                <Link to="/notes/weather" className="ml-3">Weather</Link>
            </div>
        </nav>
    );
}
 
export default Add;