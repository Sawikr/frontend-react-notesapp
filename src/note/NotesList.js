import {useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {getLogoutToken, isUserLoggedIn, logout, logoutToken} from "../service/LoginService";
import NotesService from '../service/NotesService';
import CategoryService, {getUpdatedCategoryToken, updatedCategoryToken} from '../service/CategoryService';
import Space from "../element/Space";
import SortNotesService from "../service/SortNotesService";
import {PropagateLoader} from "react-spinners";
import {saveCategory} from "../service/CategoryService";
import Alert from "../alert/Alert";

const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');
    const username = sessionStorage.getItem("authenticatedUser");
    const [loginUsername, setLoginUsername] = useState(username);
    const [categoryTrue, setCategoryTrue] = useState(false);
    const [logFirst, setLogFirst] = useState(false);
    const [error, setError] = useState(false);
    const [newCategory, setNewCategory] = useState(false);
    const [updatedCategory, setUpdatedCategory] = useState(false);
    const [errorUpdatedCategory] = useState(false);
    let [isUpdatedCategory, setIsUpdatedCategory] = useState(getUpdatedCategoryToken());
    let [isLogout, setIsLogout] = useState(getLogoutToken());
    const [logoutForm, setLogoutForm] = useState(false);
    let [counter, setCounter] = useState(0);
    const history = useHistory();
    const isAuth = isUserLoggedIn();
    const wait = (n) => new Promise((resolve) => setTimeout(resolve, n));

    useEffect(async () => {
        if (category === null) {
            setCategory('all');
        }
        if (isLogout === null) {
            logoutToken(false);
        }
        if (isUpdatedCategory === null) {
            updatedCategoryToken(false);
        }

        if (isAuth) {
            isLogout = getLogoutToken();
            isUpdatedCategory = getUpdatedCategoryToken();
            NotesService.getAll()
                .then(async response => {
                    //console.log('Printing response!', response.data);
                    setNotes(response.data);
                    setLoading(false);
                    // console.log("counter: " + counter);
                    // console.log("isLogout: " + isLogout);
                    // console.log("isUpdatedCategory: " + isUpdatedCategory);

                    if (isLogout.match(false)) {
                        if (isUpdatedCategory.match(false)) {
                            if (counter === 0) {
                                await getSaveCategory();
                            }
                            setNewCategory(true);
                            await wait(3000);
                            setNewCategory(false);
                        }
                        else if (isUpdatedCategory.match(true)) {
                            setUpdatedCategory(true);
                            await wait(3000);
                            setUpdatedCategory(false);
                            updatedCategoryToken(false);
                            setCounter(1);
                            window.location.reload();

                            if (counter === 1) {
                                await getSaveCategory();
                                setNewCategory(true);
                                await wait(3000);
                                setNewCategory(false);
                            }
                        }
                    }
                    else if (isLogout.match(true)) {
                        setLogoutForm(true);
                        await wait(3000);
                        setLogoutForm(false);
                        await logout();
                        setLoading(true);
                        //alert("Logged out successfully!");
                        history.push("/radoslaw-sawicki-frontend-react-notesapp");
                        window.location.reload();
                    }
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                })
        }
        else {
            //alert("Log in first!");
            setLogFirst(true);
            await wait(3000);
            history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }

    }, [loading, isLogout, isUpdatedCategory, counter]);

    async function getSaveCategory() {
        CategoryService.getAll()
            .then(async response => {
                //console.log('Printing response!', response.data);
                const foundCategory = response.data.filter(obj => {
                    return obj.username === loginUsername
                }).findLast(obj => {return obj}).categoryName;
                if (foundCategory) {
                    setCategory(foundCategory);
                    console.log('Saved category is: ' + foundCategory + '!');
                }
                else {
                    //alert('Set the category of notes displayed!');
                    setCategoryTrue(true);
                    await wait(3000);
                    setCategoryTrue(false);
                }
            })
            .catch(async error => {
                console.log('An error occurred!', error);
                //alert("An error occurred!");
                setError(true);
                await wait(3000);
            })
    }

    async function saveSelectedCategory() {
        saveCategory(category);
        setUpdatedCategory(updatedCategory);
        console.log('Selected category is: ' + category + '!');
    }

    return (
        <div className="main-content">
            <div className="text-md-left">
                {
                    categoryTrue &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>Set the category of notes displayed!</div>
                    </Alert>
                }
                {
                    error || errorUpdatedCategory &&
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
                {
                    newCategory &&
                    <Alert type="info">
                        <div style={{color: '#79589f'}}>Saved category is {category.toUpperCase()}!</div>
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
                        <div style={{color: '#79589f'}}>Logged out successfully!</div>
                    </Alert>
                }
                {
                    (categoryTrue || error || errorUpdatedCategory || logFirst || newCategory || updatedCategory || logoutForm) &&
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
                            value={category}
                            onClick={saveSelectedCategory}
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