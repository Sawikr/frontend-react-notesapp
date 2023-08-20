import {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import NotesService from "../service/NotesService";

const AddNote = () => {
    const[title, setTitle] = useState('');
    const[body, setBody] = useState('');
    const[category, setCategory] = useState('programming');
    const history = useHistory();
    const {id} = useParams();
    const[errors, setErrors] = useState(false);

    const saveNote = (e) => {
        e.preventDefault();
        if (!title || !body) {
            setErrors(true);
            return;
        }
        const note = {title, body, category, id};
        if (id && window.isLogin) {
            NotesService.update(note)
                .then(response => {
                    console.log(note);
                    console.log("Note updated successfully", response.data);
                    if (window.isLogin) {
                        alert("Note updated successfully!");
                        history.push("/notes/list");
                    } else
                        alert("Log in first!");
                })
                .catch(error => {
                    console.log("An error occurred!", error);
                    history.push("/radoslaw-sawicki-frontend-react-notesapp");
                })
        } else {
            NotesService.create(note)
                .then(response => {
                    console.log("Note added successfully", response.data);
                    if (window.isLogin) {
                        alert("Note added successfully!");
                        history.push("/notes/list");
                    } else
                        alert("Log in first!");
                })
                .catch(error => {
                    console.log('An error occurred!', error);
                    history.push("/radoslaw-sawicki-frontend-react-notesapp");
                })
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
        </div>
    );
}
 
export default AddNote;