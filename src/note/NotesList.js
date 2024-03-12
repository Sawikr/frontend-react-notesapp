import {useState} from 'react';
import {getLogoutToken, isUserLoggedIn, logout, logoutToken} from '../service/LoginService';
import NotesService from '../service/NotesService';
import CategoryService, {getCategory, getSelectCategory, getUpdatedCategoryToken, saveCategory, updatedCategoryToken} from '../service/CategoryService';
import Space from '../element/Space';
import SortNotesService from '../service/SortNotesService';
import {PropagateLoader} from 'react-spinners';
import Alert from '../alert/Alert';
import {useOnceEffect} from '../config/UseDevEffect';
import {getNavbarToken, navbarToken} from '../service/NavbarService';
import {getNoteCreatingDateClickToken, getNoteCreatingDateToken, noteCreatingDateClickToken, noteCreatingDateToken} from '../service/NoteCreatingDateService';
import {clickInfoToken, getClickInfoToken} from '../service/AddService';
import {useNavigate} from 'react-router';
import {useParams} from 'react-router-dom';

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState(null);
    const username = sessionStorage.getItem('authenticatedUser');
    const [loginUsername, setLoginUsername] = useState(username);
    const [categoryTrue, setCategoryTrue] = useState(false);
    const [logFirst, setLogFirst] = useState(false);
    const [error, setError] = useState(false);
    const [showedError, setShowedError] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [updatedCategory, setUpdatedCategory] = useState(false);
    const [errorUpdatedCategory] = useState(false);
    const [loginProgress, setLoginProgress] = useState(false);
    let [isUpdatedCategory, setIsUpdatedCategory] = useState(getUpdatedCategoryToken());
    let [isLogout, setIsLogout] = useState(getLogoutToken());
    const [logoutForm, setLogoutForm] = useState(false);
    const [counter, setCounter] = useState(0);
    const [start, setStart] = useState(false);
    let [interval, setInterval] = useState('');
    const [noteCreatingDateTrue, setNoteCreatingDateTrue] = useState(false);
    const [noteCreatingDateFalse, setNoteCreatingDateFalse] = useState(false);
    const navigate = useNavigate();
    const isAuth = isUserLoggedIn();
    let isHome = getNavbarToken();
    let isNoteCreatingDateToken = getNoteCreatingDateToken();
    let isNoteCreatingDateClickToken = getNoteCreatingDateClickToken();
    let isClickInfo = getClickInfoToken();
    const [noteCreatedDate, setNoteCreatedDate] = useState(false);
    const [clickSaveSelectedCategory, setClickSaveSelectedCategory] = useState(false);
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));
    const {id} = useParams();

    async function getNotesList() {
        if (category === null) {
            setCategory(await getSaveCategory());
            setCounter(2);
        }
        if (isLogout === null) {
            logoutToken(false);
        }
        if (isUpdatedCategory === null) {
            updatedCategoryToken(false);
        }
        if (isHome === null) {
            navbarToken(false);
        }
        if (isNoteCreatingDateClickToken === null) {
            noteCreatingDateClickToken(false);
        }
        if (isNoteCreatingDateToken === null) {
            noteCreatingDateToken(false);
        }

        if (isAuth) {
            if (showedError) {
                setCategory(await getSaveCategory());
            }

            if (isClickInfo === null) {
                clickInfoToken(false);
            } else if (isClickInfo.match(true)) {
                window.location.reload();
            }

            if (start) {
                setLoginProgress(true);
                await wait(3000);
                setLoginProgress(false);
            }

            NotesService.getAll()
                .then(async response => {
                    //console.log('Printing response!', response.data);
                    setNotes(response.data);
                    setLoading(false);
                    setShowedError(false);
                    setStart(false);
                    noteCreatingDateClickToken(false);

                    if (isNoteCreatingDateToken.match(true)) {
                        setNoteCreatedDate(true);
                    } else {
                        setNoteCreatedDate(false);
                    }

                    if (isLogout.match(false)) {
                        isHome = getNavbarToken();
                        if (isUpdatedCategory.match(true) && counter === 0) {
                            setCounter(1);
                            setUpdatedCategory(true);
                            await wait(4500);
                            setUpdatedCategory(false);
                            setNewCategory(true);
                            await wait(3000);
                            setNewCategory(false);
                            updatedCategoryToken(false);
                            navbarToken(false);
                        } else if (isUpdatedCategory.match(false) && counter === 2) {
                            if (isHome.match(false)) {
                                setNewCategory(true);
                                await wait(5000);
                                setNewCategory(false);
                                setCounter(1);
                                if (isNoteCreatingDateToken.match(true)) {
                                    setNoteCreatingDateFalse(true);
                                    await wait(4500);
                                    setNoteCreatingDateFalse(false);
                                } else if (isNoteCreatingDateToken.match(false)) {
                                    setNoteCreatingDateTrue(true);
                                    await wait(4500);
                                    setNoteCreatingDateTrue(false);
                                }
                                navbarToken(true);
                            }
                        }

                        if (isNoteCreatingDateClickToken.match(true)) {
                            if (isNoteCreatingDateToken.match(true)) {
                                if (counter === 2) {
                                    setNoteCreatingDateFalse(true);
                                    await wait(4500);
                                    setNoteCreatingDateFalse(false);
                                    setNoteCreatedDate(true);
                                    setCounter(1);
                                }
                            } else {
                                if (counter === 2) {
                                    setNoteCreatingDateTrue(true);
                                    await wait(4500);
                                    setNoteCreatingDateTrue(false);
                                    setNoteCreatedDate(false);
                                    setCounter(1);
                                }
                            }
                        }
                    } else if (isLogout.match(true)) {
                        setLogoutForm(true);
                        await wait(3000);
                        setLogoutForm(false);
                        setLoading(true);
                        await logout();
                        //alert("Logged out successfully!");
                        navigate("/radoslaw-sawicki-frontend-react-notesapp");
                        window.location.reload();
                    }
                    //throw error;
                })
                .catch(async error => {
                    console.log('An error occurred!', error);
                    setStart(true);
                    setShowedError(true);
                    setLoginProgress(true);
                    await wait(3000);
                    setLoginProgress(false);

                    if (start === true) {
                        interval = setInterval(async () => {
                            NotesService.getAll().then(r => console.log('Interval worked!'));
                            setStart(false);
                            setCounter(counter + 1);
                            console.log('Counter is ' + counter + '!');
                        }, 3000);
                    } else if (counter === 0 || counter === 1 || counter === 2) {
                        setStart(true);
                    } else if (counter === 3) {
                        clearInterval(interval);
                        window.location.reload();
                    }
                })
        } else {
            //alert("Log in first!");
            setLogFirst(true);
            await wait(4500);
            navigate("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }

    useOnceEffect (() => {
        getNotesList().then(r => r);
        //console.info(counter);
    }, [loading, isLogout, isUpdatedCategory, counter, start, isNoteCreatingDateToken, isNoteCreatingDateClickToken]);

    async function getSaveCategory() {
        CategoryService.getAll()
            .then(async response => {
                //console.log('Printing response!', response.data);
                let foundCategory = response.data.filter(obj => {
                    return obj.username === loginUsername})
                    .findLast(obj => {return obj}).categoryName;

                if (foundCategory) {
                    setCategory(foundCategory);
                    console.log('Saved category is: ' + foundCategory + '!');
                    console.log('Note creation date is: ' + isNoteCreatingDateToken + '!');
                    return category;
                }
                else {
                    //alert('Set the category of notes displayed!');
                    setCategoryTrue(true);
                    await wait(4500);
                    setCategoryTrue(false);
                }
            })
            .catch(async error => {
                console.log('An error occurred!', error);
                //alert("An error occurred!");
                setError(true);
                await wait(4000);
            })
    }

    async function saveSelectedCategory() {
        saveCategory(category);
        setUpdatedCategory(updatedCategory);
        setClickSaveSelectedCategory(true);
        console.log('Selected category is: ' + category + '!');
        handleSubmit();
    }

    function handleSubmit() {
        const button = document.getElementById('category');
        button.onclick = function() {
            console.log('You clicked field named category!');
            setLoading(true);
        };
    }

    return (
        <div className="main-content">
            <div className="text-md-left">
                {
                    categoryTrue &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> Set the category of notes displayed!</span>
                        </div>
                    </Alert>
                }
                {
                    error || errorUpdatedCategory &&
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
                    newCategory &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>Saved category is
                            <span className="text-uppercase" style={{color: '#79589f'}}> {category}!</span>
                        </div>
                    </Alert>
                }
                {
                    updatedCategory &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>Category updated successfully!</div>
                    </Alert>
                }
                {
                    logoutForm &&
                    <Alert type="info">
                        <div>
                            <i className="fa-solid fa-exclamation fa-beat fa-1x fa-border" style={{color: "#79589f", marginBottom: -4}}/>
                            <span className="ml-1" style={{color: '#79589f'}}> Logged out successfully!</span>
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
                    (categoryTrue || error || errorUpdatedCategory || logFirst || newCategory || updatedCategory || logoutForm ||
                        noteCreatingDateTrue || noteCreatingDateFalse || loginProgress) &&
                    <Space />
                }
            </div>
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
                            style={{cursor: "pointer"}}
                            value={category}
                            onClick={saveSelectedCategory}
                            onChange={(e) => setCategory(e.target.value)}>
                            {getSelectCategory()}
                        </select>
                    </div>
                    <div className="notes-list mt-4">
                        {
                            <SortNotesService
                                notes={notes}
                                category={category}
                                noteCreatedDate={noteCreatedDate}
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