import {Link} from "react-router-dom";
import Moment from "react-moment";

const SortNotesService = (props) => {

    function checkIfCategoryIsAll(category) {
        if (category === 'all') {
            return true;
        }
        else
            return false;
    }

    function checkLoggedInUser() {
        return sessionStorage.getItem("authenticatedUser");
    }

    function checkCategory(category) {
        return category;
    }

    return (
        <div>
        {
            !checkIfCategoryIsAll(props.category) &&

            props.notes && props.notes.filter(name => {
                return name.loginUser === checkLoggedInUser() && name.category === checkCategory(props.category)
            })
                .sort().reverse().map(note => (
                    <div key={note.id} className="notes-preview mt-3">
                        <Link to={`/notes/${note.id}`}>
                            <div style={{marginTop: 10}}>
                                <h5 className="primary-color" style={{marginLeft: 15}}>{note.title}</h5>
                            </div>
                            <div className="navbar">
                                <Moment fromNow>{note.updatedAt}</Moment>
                                <Moment format="DD-MM-YYYY" fromNow>{note.updatedAt}</Moment>
                            </div>
                        </Link>
                    </div>
                ))
        }
        {
            checkIfCategoryIsAll(props.category) &&

            props.notes && props.notes.filter(name => name.loginUser === checkLoggedInUser())
                .sort().reverse().map(note => (
                    <div key={note.id} className="notes-preview mt-3">
                        <Link to={`/notes/${note.id}`}>
                            <div style={{marginTop: 10}}>
                                <h5 className="primary-color" style={{marginLeft: 15}}>{note.title}</h5>
                            </div>
                            <div className="navbar">
                                <Moment fromNow>{note.updatedAt}</Moment>
                                <Moment format="DD-MM-YYYY" fromNow>{note.updatedAt}</Moment>
                            </div>
                        </Link>
                    </div>
                ))
        }
        </div>
    )
}

export default SortNotesService;