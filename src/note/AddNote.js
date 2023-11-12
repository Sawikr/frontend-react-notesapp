import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import NotesService from "../service/NotesService";
import LoginService, {isUserLoggedIn} from "../service/LoginService";
import Popup from "reactjs-popup";
import Space from "../element/Space";
import {PropagateLoader} from "react-spinners";
import {getNewNoteToken} from "../service/AddNoteService";

const AddNote = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [category, setCategory] = useState('programming');
    const [isLogin, setIsLogin] = useState(true);
    const username = sessionStorage.getItem("authenticatedUser");
    const [listName, setListName] = useState(username + 'List');
    const [errors, setErrors] = useState(false);
    const [loginUser, setLoginUser] = useState(username);
    const [loginName, setLoginName] = useState(username);
    const [loading, setLoading] = useState(false);
    const [updatedAt, setUpdatedAt] = useState(new Date());
    const history = useHistory();
    const {id} = useParams();
    const isAuth = isUserLoggedIn();
    const newNote = getNewNoteToken();

    const sendLogin = () => {
        const login = {loginName, isLogin};
        LoginService.sendLogin(login)
            .then(response => {
                console.log("Login sent successfully:", response.data);
                console.log(login);
            })
            .catch(error => {
                console.log("An error occurred!", error);
            })
    }

    const sendList = () => {
        const list = {listName};
        LoginService.sendList(list)
            .then(response => {
                console.log("List sent successfully:", response.data);
                console.log(list);
            })
            .catch(error => {
                console.log("An error occurred!", error);
            })
    }

    const saveNote = (e) => {
        e.preventDefault();

        if (!title || !body) {
            setErrors(true);
            return;
        } else {
            setLoading(true);
        }

        let currentDate = new Date(updatedAt.getTime());
        setUpdatedAt(currentDate);

        const note = {id, title, body, category, loginUser, updatedAt};
        const noteFields = {title, body, category, updatedAt};

        if (id && isAuth) {
            NotesService.updateNoteFields(id, noteFields)
                .then(response => {
                    console.log("Note updated successfully:", response.data);
                    console.log(noteFields);
                    setLoading(false);
                    alert("Note updated successfully!");
                    history.push("/notes/list");
                })
                .catch(error => {
                    console.log("An error occurred!", error);
                    alert("An error occurred!");
                    history.push("/radoslaw-sawicki-frontend-react-notesapp");
                })
        }
        else if (isAuth) {
            NotesService.create(note)
                .then(response => {
                    console.log("Note added successfully:", response.data);
                    console.log(note);
                    alert("Note added successfully!");
                    sendLogin();
                    sendList();
                    setLoading(false);
                    history.push("/notes/list");
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                    alert("An error occurred!");
                    history.push("/radoslaw-sawicki-frontend-react-notesapp");
                })
        } else {
            alert("Log in first!");
            history.push("/radoslaw-sawicki-frontend-react-notesapp");
        }
    }

    useEffect(() => {
        setLoading(true);
        if (id) {
            NotesService.get(id)
                .then(note => {
                    setTitle(note.data.title);
                    setBody(note.data.body);
                    setCategory(note.data.category);
                    setLoading(false);
                })
                .catch(error => {
                    console.log("An error occurred!", error);
                })
        }
        else if (newNote) {
            setLoading(false);
        }
    }, []);

    return (
        <div className="create">
            {loading ? (
                <div className="loader-container">
                    <div className="text-center">
                        <PropagateLoader color={'#79589f'} size={20}/>
                        <Space/>
                    </div>
                </div>
            ) : (
            <div className="create">
                <div className="text-center">
                    <h5>{id ? "Update a Note" : "Add a New Note"}</h5>
                    {!errors && <Space/>}
                    {errors && <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
                </div>
                <form>
                    <div className="form-group">
                        <Popup trigger={<label htmlFor="title">Note Title: <sup>*</sup></label>}
                               position="right center">
                            <div className="popup-body">
                                <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                            </div>
                        </Popup>
                        <input
                            type="text"
                            className="input"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <Popup trigger={<label htmlFor="body">Note Description: <sup>*</sup></label>}
                               position="right center">
                            <div className="popup-body">
                                <span style={{color: 'red', fontStyle: 'italic'}}>The mandatory field!</span>
                            </div>
                        </Popup>
                        <textarea
                            id="body"
                            className="textarea"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}>
                    </textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Note Category:</label>
                        <select
                            id="category"
                            className="select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}>
                            <option value="blogging">Blogging</option>
                            <option value="congregation">Congregation</option>
                            <option value="circuit">Circuit</option>
                            <option value="meeting">Meeting</option>
                            <option value="programming">Programming</option>
                            <option value="other">Other</option>
                            <option value="vacation">Vacation</option>
                        </select>
                    </div>
                    <label className="text-md-left" style={{color: 'black', fontSize: "11px"}}>
                        <span style={{textAlignVertical: 'center', fontSize: "8px", fontStyle: 'italic'}}>*</span> Press</label>
                    <div className="text-center">
                        <button className="button-add"
                            onClick={(e) => saveNote(e)}>{id ? "Update Note": "Add Note"}</button>
                    </div>
                </form>
            <Space/>
            </div>
            )}
        </div>
    );
}
 
export default AddNote;