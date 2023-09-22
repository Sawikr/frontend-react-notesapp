import {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {isUserLoggedIn} from "../service/LoginService";
import NotesService from '../service/NotesService';
import Moment from "react-moment";
import Space from "../element/Space";

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const history = useHistory();
    const isAuth = isUserLoggedIn();

    useEffect(() => {
        if (isAuth) {
            NotesService.getAll()
                .then(response => {
                    console.log('Printing response!', response.data);
                    setNotes(response.data);
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                })
        } else {
            alert("Log in first!");
            history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }, []);

    function checkLoggedInUser() {
        return sessionStorage.getItem("authenticatedUser");
    }

    return (
        <div className="main-content">
            <h4 className="text-center">List of Notes</h4>
            <Space/>
            <div className="notes-list mt-4">
                {
                    notes && notes.filter(name => name.loginUser === checkLoggedInUser()).map(note => (
                        <div key={note.id} className="notes-preview mt-3">
                            <Link to={`/notes/${note.id}`}>
                                <h5 className="primary-color text-capitalize">{note.title}</h5>
                                <Moment fromNow>{note.updatedAt}</Moment>
                            </Link>
                        </div>
                    ))
                }
            </div>
            <Space/>
        </div>
    );
}

export default NotesList;