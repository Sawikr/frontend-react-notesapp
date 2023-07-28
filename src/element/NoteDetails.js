import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import NotesService from "../service/NotesService";

const NoteDetails = () => {
    const {id} = useParams();
    const[currentNote, setCurrentNote] = useState('');
    const history = useHistory();

    useEffect(() => {
        NotesService.get(id)
            .then(note => {
                setCurrentNote(note.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, [id]);

    const handleDelete = () => {
        NotesService.remove(id)
            .then(response => {
                history.push("/");
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    return (
        <div className="note-details main-content">
            <article>
                <h5 className="text-capitalize primary-color">{currentNote.title}</h5>
                <div className="mb-3 font-italic metadata">
                    <span>{currentNote.updatedAt}</span>
                    <span className="text-capitalize">, {currentNote.category}</span>
                </div>
                <div className="mb-3">{currentNote.body}</div>
            </article>
            <button onClick={handleDelete}>Delete</button>
        </div>
    );
}

export default NoteDetails;