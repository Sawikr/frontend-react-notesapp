import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import {useEffect, useState, useMemo} from 'react';
import LoginService from './LoginService';
import Pagination from '../pagination/Pagination';
import Space from '../element/Space';

const SortNotesService = (props) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const username = sessionStorage.getItem("authenticatedUser");
    const [currentPage, setCurrentPage] = useState(1);
    const [visiblePagination, setVisiblePagination] = useState(false);
    let [newCategory, setNewCategory] = useState('');
    let [getCategory, setGetCategory] = useState([]);
    let [foundCategoryNotes, setFoundCategoryNotes] = useState('');
    let [foundAllNotes, setFoundAllNotes] = useState('');
    let [counter, setCounter] = useState(0);
    let category = props.category;
    let PageSize = 4;

    function checkIfCategoryIsAll(category) {
        if (category === 'all') {
            return true;
        } else
            return false;
    }

    function checkLoggedInUser() {
        return sessionStorage.getItem("authenticatedUser");
    }

    function checkCategory(category) {
        return category;
    }

    function checkCategoryInNote(category) {
        let getCategory = categoryNotes.filter(obj => {
            return (obj.category === checkCategory(props.category));
        })
        let newCategory = getCategory.category;
        setNewCategory(newCategory);
        console.info(newCategory);

        if (newCategory === category) {
            return true;
        } else
            return false;
    }

    useEffect(() => {
        LoginService.getAllUsers()
            .then(response => {
                const foundUsername = response.data.find(obj => {
                    return obj.username.match(username);
                });
                const foundEmail = response.data.find(obj => {
                    return obj.email.match(username);
                });
                if (foundUsername) {
                    let loginEmail = foundUsername.email;
                    setLoginEmail(loginEmail);
                    console.log('Email is ' + loginEmail + '!');
                }
                else if (foundEmail) {
                    let loginUsername = foundEmail.username;
                    setLoginUsername(loginUsername);
                    console.log('Username is ' + loginUsername + '!');
                }
                else
                    console.log('Username or email does not exist!');
                //console.log(response);
            })
            .catch(error => {
                console.log("An error occurred!", error);
            })
    }, []);

    function notesDisplay(note) {
        return <>
            {
                props.noteCreatedDate &&
                <div className="navbar" style={{fontSize: 14}}>
                    <span className="notes-display-one font-italic">Note created: </span>
                    <Moment className="notes-display-two" fromNow>{note.createdAt}</Moment>
                    <Moment className="notes-display-three" format="DD-MM-YYYY" fromNow>{note.createdAt}</Moment>
                </div>
            }
            {
                props.noteCreatedDate &&
                <div className="navbar" style={{fontSize: 14}}>
                    <span className="notes-display-one font-italic">Note updated: </span>
                    <Moment className="notes-display-two" fromNow>{note.updatedAt}</Moment>
                    <Moment className="notes-display-three" format="DD-MM-YYYY" fromNow>{note.updatedAt}</Moment>
                </div>
            }
            {
                !props.noteCreatedDate &&
                <div className="navbar">
                    <Moment fromNow>{note.updatedAt}</Moment>
                    <Moment format="DD-MM-YYYY" fromNow>{note.updatedAt}</Moment>
                </div>
            }
        </>;
    }

    function foundSpecificCategory(category) {
        return foundCategoryNotes = props.notes.filter(obj => {
            return obj.category === category}).sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    function foundAllCategories(category) {
        return foundAllNotes = props.notes.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }

    const foundNotesByCategory = props.notes.filter(obj => {
        return obj.category === checkCategory(category)});

    const allNotes = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return foundAllCategories(category).slice(firstPageIndex, lastPageIndex);
    }, [currentPage, category]);

    let categoryNotes = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return foundSpecificCategory(category).slice(firstPageIndex, lastPageIndex);
    }, [currentPage, category]);

    useEffect(() => {
        if (checkIfCategoryIsAll(category)) {
            setVisiblePagination(true);
        }
        if (checkIfCategoryIsAll(category)) {
            console.info("Number of notes per page: " + allNotes.length);
        } else
            console.info("Number of notes per page: " + categoryNotes.length);
    }, [newCategory, categoryNotes, visiblePagination]);

    return (
        <div>
            {
                !checkIfCategoryIsAll(category) &&

                categoryNotes && categoryNotes.filter(name => {
                    return (name.loginUser === checkLoggedInUser() || name.loginUser === loginEmail || name.loginUser === loginUsername)
                        && name.category === checkCategory(category)
                })
                    .map(note => (
                        <div key={note.id} className="notes-preview mt-3">
                            <Link to={`/notes/${note.id}`}>
                                <div style={{marginTop: 10}}>
                                    <h5 className="notes-primary-color"
                                        style={{marginLeft: 15}}>{note.title}</h5>
                                </div>
                                {notesDisplay(note)}
                            </Link>
                        </div>
                    ))
            }
            {
                checkIfCategoryIsAll(category) &&

                allNotes && allNotes.filter(name => {
                    return (name.loginUser === checkLoggedInUser() || name.loginUser === loginEmail || name.loginUser === loginUsername)
                })
                    .map(note => (
                        <div key={note.id} className="notes-preview mt-3">
                            <Link to={`/notes/${note.id}`}>
                                <div style={{marginTop: 10}}>
                                    <h5 className="notes-primary-color"
                                        style={{marginLeft: 15}}>{note.title}</h5>
                                </div>
                                {notesDisplay(note)}
                            </Link>
                        </div>
                    ))
            }
            <Space/>
            {
                !checkIfCategoryIsAll(category) &&
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={foundNotesByCategory.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            }
            {
                checkIfCategoryIsAll(category) &&
                <Pagination
                    className="pagination-bar"
                    currentPage={currentPage}
                    totalCount={props.notes.length}
                    pageSize={PageSize}
                    onPageChange={page => setCurrentPage(page)}
                />
            }
        </div>
    );
}

export default SortNotesService;