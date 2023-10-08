import AddService from "../service/AddService";
import ApiService from "../service/ApiService";

const Add = () => {

    return (  
        <nav className="navbar">
            <div>
                <ApiService/>
            </div>
            <div>
                <AddService/>
            </div>
        </nav>
    );
}
 
export default Add;