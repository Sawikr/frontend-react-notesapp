import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {isUserLoggedIn} from "../service/LoginService";
import NotesService from '../service/NotesService';
import Space from "../element/Space";
import SortNotesService from "../service/SortNotesService";

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
                    <option value="circuit">Circuit</option>
                    <option value="meeting">Meeting</option>
                    <option value="programming">Programming</option>
                    <option value="other">Other</option>
                    <option value="vacation">Vacation</option>
                </select>
            </div>
            <div className="notes-list mt-4">
                {
                    <SortNotesService
                        notes={notes}
                        category={category}
                    />
                }
            </div>
            <Space/>
        </div>
    );
}

export default NotesList;