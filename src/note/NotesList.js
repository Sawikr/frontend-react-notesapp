import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {isUserLoggedIn} from "../service/LoginService";
import NotesService from '../service/NotesService';
import Space from "../element/Space";
import SortNotesService from "../service/SortNotesService";
import {PropagateLoader} from "react-spinners";

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [category, setCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const isAuth = isUserLoggedIn();

    useEffect(() => {
        if (isAuth) {
            NotesService.getAll()
                .then(response => {
                    console.log('Printing response!', response.data);
                    setNotes(response.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                })
        } else {
            alert("Log in first!");
            history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }, [loading]);

    return (
        <div className="main-content">
            {loading ? (
                <div className="loader-container" style={{marginTop: 77}}>
                    <div className="text-center">
                        <PropagateLoader color={'#79589f'} size={20}/>
                        <Space/>
                    </div>
                </div>
            ) : (
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
            )}
        </div>
    );
}

export default NotesList;