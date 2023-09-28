import {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {isUserLoggedIn} from "../service/LoginService";
import NotesService from '../service/NotesService';
import Moment from "react-moment";
import Space from "../element/Space";

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [category, setCategory] = useState('all');
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

    function checkCategory(category) {
        return category;
    }

    function checkIfCategoryIsAll(category) {
        if (category === 'all') {
            return true;
        }
        else
            return false;
    }

    return (
        <div className="main-content">
            <h4 className="text-center">List of Notes</h4>
            <Space/>
            <div className="text-center">
                <select
                    id="category"
                    className="main-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}>
                    <option value="all">All categories</option>
                    <option value="blogging">Blogging</option>
                    <option value="congregation">Congregation</option>
                    <option value="meeting">Meeting</option>
                    <option value="programming">Programming</option>
                    <option value="other">Other</option>
                    <option value="vacation">Vacation</option>
                </select>
            </div>
            <div className="notes-list mt-4">
                {
                    !checkIfCategoryIsAll(category) &&

                    notes && notes.filter(name => {return name.loginUser === checkLoggedInUser() && name.category === checkCategory(category)})
                        .sort().reverse().map(note => (
                            <div key={note.id} className="notes-preview mt-3">
                                <Link to={`/notes/${note.id}`}>
                                    <h5 className="primary-color text-capitalize">{note.title}</h5>
                                    <Moment fromNow>{note.updatedAt}</Moment>
                                </Link>
                            </div>
                        ))
                }
                {
                    checkIfCategoryIsAll(category) &&

                    notes && notes.filter(name => name.loginUser === checkLoggedInUser())
                        .sort().reverse().map(note => (
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