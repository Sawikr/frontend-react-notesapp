import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import NotesService from "../service/NotesService";
import LoginService, {isUserLoggedIn} from "../service/LoginService";
import Space from "../element/Space";

const AddNote = () => {
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');
    const[category, setCategory] = useState('programming');
    const[loginName, setLoginName] = useState('User');
    const[isLogin, setIsLogin] = useState(true);
    const[listName, setListName] = useState('UserList');
    const[errors, setErrors] = useState(false);
    const history = useHistory();
    const {id} = useParams();
    const isAuth = isUserLoggedIn();

    const sendLogin = () => {
        const login = {loginName, isLogin};
        LoginService.sendLogin(login)
            .then(response => {
                console.log(login);
                console.log("Login sent successfully", response.data);
            })
            .catch(error => {
                console.log("An error occurred!", error);
            })
    }

    const sendList = () => {
        const list = {listName};
        LoginService.sendList(list)
            .then(response => {
                console.log(list);
                console.log("List sent successfully", response.data);
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
        }

        const note = {title, body, category, id};
        if (id && isAuth) {
            NotesService.update(note)
                .then(response => {
                    console.log(note);
                    console.log("Note updated successfully", response.data);
                    alert("Note updated successfully!");
                    history.push("/notes/list");
                })
                .catch(error => {
                    console.log("An error occurred!", error);
                    alert("An error occurred!");
                    history.push("/radoslaw-sawicki-frontend-react-notesapp");
                })
        } else if (isAuth) {
            NotesService.create(note)
                .then(response => {
                    console.log("Note added successfully", response.data);
                    alert("Note added successfully!");
                    sendLogin();
                    sendList();
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
        if (id) {
            NotesService.get(id)
                .then(note => {
                    setTitle(note.data.title);
                    setBody(note.data.body);
                    setCategory(note.data.category);
                })
                .catch(error => {
                    console.log("An error occurred!", error);
                })
        }
    }, []);

    return (
        <div className="create">
            <div className="text-center">
                <h5>{id ? "Update a Note" : "Add a New Note"}</h5>
                <Space/>
                {errors && <span style={{color: 'red', fontStyle: 'italic'}}>Please enter the mandatory fields!</span>}
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Note Title: <sup>*</sup></label>
                    <input 
                        type="text" 
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="body">Note Description: <sup>*</sup></label>
                    <textarea 
                        id="body"
                        className="form-control"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}>
                    </textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="category">Note Category:</label>
                    <select
                        id="category"
                        className="form-control"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}>
                        <option value="programming">Programming</option>
                        <option value="vacation">Vacation</option>
                        <option value="meeting">Meeting</option>
                        <option value="blogging">Blogging</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div className="text-center">
                    <button onClick={(e) => saveNote(e)}>{id ? "Update Note": "Add Note"}</button>
                </div>
            </form>
            <Space/>
        </div>
    );
}
 
export default AddNote;