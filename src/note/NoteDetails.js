import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {isUserLoggedIn} from '../service/LoginService';
import NotesService from '../service/NotesService';
import Moment from 'react-moment';
import Space from '../element/Space';
import {PropagateLoader} from 'react-spinners';
import {newNoteToken} from '../service/AddNoteService';
import {getNoteCreatingDateToken, noteCreatingDateToken} from '../service/NoteCreatingDateService';
import Alert from '../alert/Alert';
import {getNavbarToken, navbarToken} from '../service/NavbarService';
import {useNavigate} from 'react-router';

const NoteDetails = () => {
    const [currentNote, setCurrentNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [noteCreatedDate, setNoteCreatedDate] = useState(false);
    const [deletedTrue, setDeletedTrue] = useState(false);
    const [error, setError] = useState(false);
    const [logFirst, setLogFirst] = useState(false);
    const [loginProgress, setLoginProgress] = useState(false);
    const [noteCreatingDateTrue, setNoteCreatingDateTrue] = useState(false);
    const [noteCreatingDateFalse, setNoteCreatingDateFalse] = useState(false);
    const [counter, setCounter] = useState(0);
    const [start, setStart] = useState(false);
    const [showReturnButton, setShowReturnButton] = useState(false);
    let [interval, setInterval] = useState('');
    const {id} = useParams();
    const navigate = useNavigate();
    const isAuth = isUserLoggedIn();
    let isNoteCreatingDateToken = getNoteCreatingDateToken();
    let isHome = getNavbarToken();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    function isNote() {
        if (getNoteCreatingDateToken() === null || getNoteCreatingDateToken().match(false)) {
            setNoteCreatedDate(false);
        }
        else {
            setNoteCreatedDate(true);
        }
    }

    async function getNoteDetails() {
        setLoading(true);
        setShowReturnButton(false);
        if (isNoteCreatingDateToken === null) {
            noteCreatingDateToken(false);
        }
        if (isHome === null) {
            navbarToken(false);
        }

        if (isAuth) {
            if (start) {
                setLoginProgress(true);
                await wait(3000);
                setLoginProgress(false);
            }

            isNoteCreatingDateToken = getNoteCreatingDateToken();
            isHome = getNavbarToken();
            NotesService.get(id)
                .then(async note => {
                    setCurrentNote(note.data);
                    setLoading(false);
                    setStart(false);
                    isNote();
                    await showButton();

                    if (isNoteCreatingDateToken.match(true)) {
                        isHome = getNavbarToken();
                        if (isHome.match(false)) {
                            setNoteCreatingDateFalse(true);
                            await wait(3000);
                            setNoteCreatingDateFalse(false);
                        }
                        navbarToken(false);
                    } else if (isNoteCreatingDateToken.match(false)) {
                        isHome = getNavbarToken();
                        if (isHome.match(false)) {
                            setNoteCreatingDateTrue(true);
                            await wait(3000);
                            setNoteCreatingDateTrue(false);
                        }
                        navbarToken(false);
                    }
                    //throw error;
                })
                .catch(async error => {
                    console.log('An error occurred!', error);
                    setStart(true);
                    setLoginProgress(true);
                    await wait(3000);
                    setLoginProgress(false);
                    navbarToken(true);

                    if (start === true) {
                        interval = setInterval(async () => {
                            NotesService.get(id).then(r => console.log('Interval worked!'));
                            setStart(false);
                            setCounter(counter + 1);
                            console.log('Counter is ' + counter + '!');
                        }, 3000);
                    } else if (counter === 0 || counter === 1 || counter === 2) {
                        setStart(true);
                    } else if (counter === 3) {
                        clearInterval(interval);
                        window.location.reload(false);
                    }
                })
        } else {
            //alert("Log in first!");
            setLogFirst(true);
            await wait(3000);
            navigate("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }

    useEffect(() => {
        getNoteDetails().then(r => r);
    }, [isNoteCreatingDateToken, counter, start]);

    const handleDelete = async () => {
        setLoading(true);
        navbarToken(true);
        if (isAuth) {
            NotesService.remove(id)
                .then(async response => {
                    console.log('Note deleted successfully: id: ' + id);
                    setLoading(false);
                    //alert("Note deleted successfully!");
                    setDeletedTrue(true);
                    await wait(3000);
                    navigate("/notes/list");
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
            navigate("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }

    const handleUpdate = () => {
        newNoteToken(false);
        navbarToken(true);
        navigate(`/notes/edit/${id}`);
    }

    const handleSend = () => {
        newNoteToken(false);
        navbarToken(true);
        navigate(`/notes/email/${id}`);
    }

    function returnButton() {
        navbarToken(true);
        navigate(-1);
    }

    async function showButton() {
        await wait(3000);
        setShowReturnButton(true);
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
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> An error occurred!</span>
                        </div>
                    </Alert>
                }
                {
                    logFirst &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> Log in first!</span>
                        </div>
                    </Alert>
                }
                {
                    noteCreatingDateTrue &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>Note creation date display disabled!</div>
                    </Alert>
                }
                {
                    noteCreatingDateFalse &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>Note creation date display enabled!</div>
                    </Alert>
                }
                {
                    loginProgress &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> Logging in... Please wait for the server's response!</span>
                        </div>
                    </Alert>
                }
                {
                    (deletedTrue || error || logFirst || noteCreatingDateTrue || noteCreatingDateFalse || loginProgress) &&
                    <Space />
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
                <div className="detail-container-one">
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
                            <div className="mb-3" style={{textJustify: "auto", textAlign: "justify"}}>{currentNote.body}</div>
                        </article>
                        <Space/>
                        <button className="button" onClick={handleUpdate}>Edit</button>
                        <button className="button ml-3" onClick={handleDelete}>Delete</button>
                        <button className="button ml-3" onClick={handleSend}>Send</button>
                    </div>
                    }
                <Space/>
                </div>
            </div>
            )}
            {
                showReturnButton &&
                <button
                    title='Back to previous page'
                    style={{background: "white"}} onClick={returnButton}>
                    <i className="fa-solid fa-arrow-turn-down fa-rotate-90 fa-lg" style={{color: "#79589f"}}/>
                </button>
            }
        </div>
    );
}

export default NoteDetails;