import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {isUserLoggedIn} from "../service/LoginService";
import NotesService from "../service/NotesService";
import Moment from "react-moment";
import Space from "../element/Space";
import {PropagateLoader} from "react-spinners";
import {newNoteToken} from "../service/AddNoteService";
import {getNoteCreatingDateToken} from "../service/NoteCreatingDateService";
import Alert from "../alert/Alert";

const NoteDetails = () => {
    const [currentNote, setCurrentNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [noteCreatedDate, setNoteCreatedDate] = useState(false);
    const [deletedTrue, setDeletedTrue] = useState(false);
    const [error, setError] = useState(false);
    const [logFirst, setLogFirst] = useState(false);
    const {id} = useParams();
    const history = useHistory();
    const isAuth = isUserLoggedIn();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    function isNote() {
        if (getNoteCreatingDateToken() === null || getNoteCreatingDateToken().match(false)) {
            setNoteCreatedDate(false);
        }
        else {
            setNoteCreatedDate(true);
        }
        console.log("Note creation date is set to " + noteCreatedDate + "!");
    }

    useEffect(async () => {
        setLoading(true);
        if (isAuth) {
            NotesService.get(id)
                .then(note => {
                    setCurrentNote(note.data);
                    setLoading(false);
                    isNote();
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                })
        } else {
            //alert("Log in first!");
            setLogFirst(true);
            await wait(3000);
            history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }, [noteCreatedDate]);

    const handleDelete = async () => {
        setLoading(true);
        if (isAuth) {
            NotesService.remove(id)
                .then(async response => {
                    console.log("Note deleted successfully: id: " + id);
                    setLoading(false);
                    //alert("Note deleted successfully!");
                    setDeletedTrue(true);
                    await wait(3000);
                    history.push("/notes/list");
                })
                .catch(async error => {
                    console.log('An error occurred!', error);
                    //alert("An error occurred!");
                    setError(true);
                    await wait(3000);
                })
        } else {
            //alert("Log in first!");
            setLogFirst(true);
            await wait(3000);
            history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }

    const handleUpdate = () => {
        newNoteToken(false);
        history.push(`/notes/edit/${id}`);
    }

    const handleSend = () => {
        newNoteToken(false);
        history.push(`/notes/email/${id}`);
    }

    return (
        <div className="note-details main-content">
            <div className="text-md-left">
                {
                    deletedTrue &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>Note deleted successfully!</div>
                    </Alert>
                }
                {
                    error &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>An error occurred!</div>
                    </Alert>
                }
                {
                    logFirst &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>Log in first!</div>
                    </Alert>
                }
            </div>
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
                            <h5 className="primary-color">{currentNote.title}</h5>
                            <p></p>
                            {
                                noteCreatedDate &&
                                <div className="mb-3 font-italic metadata">
                                    <span>Note created: </span>
                                    <Moment fromNow>{currentNote.createdAt}</Moment>
                                    <span className="text-capitalize">, </span>
                                    <Moment format="DD-MM-YYYY HH:mm" fromNow>{currentNote.createdAt}</Moment>
                                    <span className="text-capitalize">, {currentNote.category}</span>
                                </div>
                            }
                            <div className="mb-3 font-italic metadata">
                                {
                                    noteCreatedDate &&
                                    <span className="mb-3 font-italic metadata">Note updated: </span>
                                }
                                <Moment fromNow>{currentNote.updatedAt}</Moment>
                                <span className="text-capitalize">, </span>
                                <Moment format="DD-MM-YYYY HH:mm" fromNow>{currentNote.updatedAt}</Moment>
                                <span className="text-capitalize">, {currentNote.category}</span>
                            </div>
                            <div className="mb-3">{currentNote.body}</div>
                        </article>
                        <Space/>
                        <button className="button" onClick={handleUpdate}>Edit</button>
                        <button className="button ml-3" onClick={handleDelete}>Delete</button>
                        <button className="button ml-3" onClick={handleSend}>Send</button>
                    </div>
                    }
                <Space/>
            </div>
            )}
        </div>
    );
}

export default NoteDetails;