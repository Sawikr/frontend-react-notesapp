import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import NotesService from "../service/NotesService";
import Moment from "react-moment";

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
    }, []);

    const handleDelete = () => {
        NotesService.remove(id)
            .then(response => {
                alert("Note deleted successfully!");
                history.push("/notes/list");
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }

    const handleUpdate = () => {
        history.push(`/notes/edit/${id}`);
    }

    const handleSend = () => {
        history.push(`/notes/email/${id}`);
    }

    return (
        <div className="note-details main-content">
            {
                currentNote &&
                <div>
                    <article>
                        <h5 className="text-capitalize primary-color">{currentNote.title}</h5>
                        <div className="mb-3 font-italic metadata">
                            <Moment fromNow>{currentNote.updatedAt}</Moment>
                            <span className="text-capitalize">, </span>
                            <Moment format="DD/MM/YYYY HH:mm" fromNow>{currentNote.updatedAt}</Moment>
                            <span className="text-capitalize">, {currentNote.category}</span>
                        </div>
                        <div className="mb-3">{currentNote.body}</div>
                    </article>
                    <button onClick={handleUpdate}>Edit</button>
                    <button onClick={handleDelete} className="ml-3">Delete</button>
                    <button onClick={handleSend} className="ml-3">Send</button>
                </div>
            }
        </div>
    );
}

export default NoteDetails;