import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {isUserLoggedIn} from "../service/LoginService";
import NotesService from "../service/NotesService";
import Moment from "react-moment";
import Space from "../element/Space";
import {PropagateLoader} from "react-spinners";

const NoteDetails = () => {
    const [currentNote, setCurrentNote] = useState('');
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
    const history = useHistory();
    const isAuth = isUserLoggedIn();

    useEffect(() => {
        setLoading(true);
        if (isAuth) {
            NotesService.get(id)
                .then(note => {
                    setCurrentNote(note.data);
                    setLoading(false);
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                })
        } else {
                alert("Log in first!");
                history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }, []);

    const handleDelete = () => {
        setLoading(true);
        if (isAuth) {
            NotesService.remove(id)
                .then(response => {
                    setLoading(false);
                    alert("Note deleted successfully!");
                    history.push("/notes/list");
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                })
        } else {
            alert("Log in first!");
            history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }

    const handleUpdate = () => {
        history.push(`/notes/edit/${id}`);
    }

    const handleSend = () => {
        history.push(`/notes/email/${id}`);
    }

    return (
        <div className="note-details main-content">
            {loading ? (
                <div className="loader-container" style={{marginTop: 70}}>
                    <div className="text-center">
                        <PropagateLoader color={'#79589f'} size={20}/>
                        <Space/>
                    </div>
                </div>
            ) : (
            <div className="note-details main-content">
                {
                    currentNote &&
                    <div>
                        <article>
                            <h5 className="text-capitalize primary-color">{currentNote.title}</h5>
                            <p></p>
                            <div className="mb-3 font-italic metadata">
                                <Moment fromNow>{currentNote.updatedAt}</Moment>
                                <span className="text-capitalize">, </span>
                                <Moment format="DD-MM-YYYY HH:mm" fromNow>{currentNote.updatedAt}</Moment>
                                <span className="text-capitalize">, {currentNote.category}</span>
                            </div>
                            <div className="mb-3">{currentNote.body}</div>
                        </article>
                        <Space/>
                        <button onClick={handleUpdate}>Edit</button>
                        <button onClick={handleDelete} className="ml-3">Delete</button>
                        <button onClick={handleSend} className="ml-3">Send</button>
                    </div>
                    }
                <Space/>
            </div>
            )}
        </div>
    );
}

export default NoteDetails;