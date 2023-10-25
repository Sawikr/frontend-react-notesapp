import {Link} from "react-router-dom";
import Moment from "react-moment";
import {useEffect, useState} from "react";
import LoginService from "./LoginService";

const SortNotesService = (props) => {
    const [loginEmail, setLoginEmail] = useState('');
    const [loginUsername, setLoginUsername] = useState('');
    const username = sessionStorage.getItem("authenticatedUser");

    function checkIfCategoryIsAll(category) {
        if (category === 'all') {
            return true;
        }
        else
            return false;
    }

    function checkLoggedInUser() {
        return sessionStorage.getItem("authenticatedUser");
    }

    function checkCategory(category) {
        return category;
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
                if (foundEmail) {
                    let loginUsername = foundEmail.username;
                    setLoginUsername(loginUsername);
                    console.log('Username is ' + loginUsername + '!');
                }
                //console.log(response);
            })
            .catch(error => {
                console.log("An error occurred!", error);
            })
    }, []);

    return (
        <div>
        {
            !checkIfCategoryIsAll(props.category) &&

            props.notes && props.notes.filter(name => {
                return (name.loginUser === checkLoggedInUser() || name.loginUser === loginEmail || name.loginUser === loginUsername)
                    && name.category === checkCategory(props.category)
            })
                .sort().reverse().map(note => (
                    <div key={note.id} className="notes-preview mt-3">
                        <Link to={`/notes/${note.id}`}>
                            <div style={{marginTop: 10}}>
                                <h5 className="primary-color" style={{marginLeft: 15}}>{note.title}</h5>
                            </div>
                            <div className="navbar">
                                <Moment fromNow>{note.updatedAt}</Moment>
                                <Moment format="DD-MM-YYYY" fromNow>{note.updatedAt}</Moment>
                            </div>
                        </Link>
                    </div>
                ))
        }
        {
            checkIfCategoryIsAll(props.category) &&

            props.notes && props.notes.filter(name => {
                return (name.loginUser === checkLoggedInUser() || name.loginUser === loginEmail || name.loginUser === loginUsername)})
                .sort().reverse().map(note => (
                    <div key={note.id} className="notes-preview mt-3">
                        <Link to={`/notes/${note.id}`}>
                            <div style={{marginTop: 10}}>
                                <h5 className="primary-color" style={{marginLeft: 15}}>{note.title}</h5>
                            </div>
                            <div className="navbar">
                                <Moment fromNow>{note.updatedAt}</Moment>
                                <Moment format="DD-MM-YYYY" fromNow>{note.updatedAt}</Moment>
                            </div>
                        </Link>
                    </div>
                ))
        }
        </div>
    )
}

export default SortNotesService;