import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NotesService from '../service/NotesService';

const NotesList = () => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        NotesService.getAll()
            .then(response => {
                console.log('Printing response!', response.data);
                setNotes(response.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, []);

    return (
        <div className="main-content">
            <h4>List of Notes</h4>
            <div className="notes-list mt-4">
                {
                    notes && notes.map(note => (
                        <div key={note.id} className="notes-preview mt-3">
                            <Link to={`/notes/${note.id}`}>
                                <h5 className="primary-color text-capitalize">{note.title}</h5>
                                <p>{note.body}</p>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default NotesList;