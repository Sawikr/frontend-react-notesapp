import { useEffect, useState } from "react";
import notesService from "../service/notesService";

const notesList = () => {

    const [notes, setNotes] = useState([]);

    useEffect(() => {
        notesService.getAll()
            .then(response => {
                console.log('Printing response!', response.data);
                setNotes(response.data);
            })
            .catch(error => {
                console.log('An error occurred!', error);
            })
    }, []);

    return (  
        <div>
            <h1>List of Notes</h1>
            {
                notes && notes.map(note => (
                    <div key={note.id}>
                        <p>{note.title}</p>
                        <p>{note.body}</p>
                    </div>
                ))
            }
        </div>
    );
}
 
export default notesList;