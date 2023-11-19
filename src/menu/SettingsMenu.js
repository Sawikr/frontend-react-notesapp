import {useHistory, useParams} from "react-router-dom";
import {Menu} from '@mui/base/Menu';
import {MenuItem, menuItemClasses} from '@mui/base/MenuItem';
import {MenuButton} from '@mui/base/MenuButton';
import CategoryService, {getCategory} from "../service/CategoryService";
import {Dropdown} from '@mui/base/Dropdown';
import {BsGear} from 'react-icons/bs';
import {logout} from '../service/LoginService';
import {useEffect, useState} from "react";
import {getNoteCreatingDateToken, noteCreatingDateToken} from "../service/NoteCreatingDateService";

const SettingsMenu = () => {
    let [categoryName, setCategoryName] = useState('');
    const loginUsername = sessionStorage.getItem("authenticatedUser");
    let [username, setUsername] = useState(loginUsername);
    let [noteCreatedDateIsTrue, setNoteCreatedDateIsTrue] = useState(getNoteCreatingDateToken());
    const history = useHistory();
    const {id} = useParams();

    const createHandleMenuClick = (menuItem) => {
        if (menuItem === 'Set category') {
            return () => {
                console.log(`Clicked on: ${menuItem}!`);
                alert('Category set: ' + getCategory().toUpperCase() + '!');

                categoryName = getCategory();
                const category = {id, categoryName, username};

                CategoryService.createCategory(category)
                    .then(() => {
                        console.log('Updated category is: ' + categoryName + '!');
                        console.log('Updated username is: ' + username + '!');
                        alert("Category updated successfully!");
                    })
                    .catch(error => {
                        console.log('An error occurred!', error);
                        alert("An error occurred!");
                    })
            };
        }
        else if (menuItem === 'Note creating date') {
            return () => {
                console.log(`Clicked on: ${menuItem}!`);
                if (noteCreatedDateIsTrue === null || noteCreatedDateIsTrue.match(true)) {
                    noteCreatingDateToken(false);
                    setNoteCreatedDateIsTrue(false);
                    alert("Note creation date display disabled!");
                    window.location.reload();
                }
                else if (noteCreatedDateIsTrue.match(false)) {
                    noteCreatingDateToken(true);
                    setNoteCreatedDateIsTrue(true);
                    alert("Note creation date display enabled!");
                    window.location.reload();
                }
                console.log("Note creation date is set to " + getNoteCreatingDateToken() + "!");
            };
        }
        else if (menuItem === 'Log out') {
            return () => {
                console.log(`Clicked on: ${menuItem}!`);
                logout();
                alert("Logged out successfully!");
                history.push("/radoslaw-sawicki-frontend-react-notesapp");
                window.location.reload();
            };
        };
    }

    useEffect(() => {
    }, [noteCreatedDateIsTrue])

    return (
        <Dropdown>
            <MenuButton className="text-right" style={{marginLeft: 5, marginRight: -10, background: 'white'}}>
                <BsGear className="TriggerButtonIntroduction" style={{fontSize: "1.2em"}}/>
            </MenuButton>
            <Menu
                className="CustomMenuIntroduction"
                slotProps={{
                    listbox: {className: 'CustomMenuIntroduction--listbox'},
                }}
            >
                <MenuItem
                    className="CustomMenuIntroduction--item"
                    onClick={createHandleMenuClick('Set category')}
                >
                    Set category
                </MenuItem>
                <MenuItem
                    className="CustomMenuIntroduction--item"
                    onClick={createHandleMenuClick('Note creating date')}
                >
                    Note creating date
                </MenuItem>
                <MenuItem
                    className="CustomMenuIntroduction--item"
                    onClick={createHandleMenuClick('Log out')}
                >
                    Log out
                </MenuItem>
            </Menu>
            <Styles/>
        </Dropdown>
    );
}

function Styles() {
    return (
        <style>{`
        .CustomMenuIntroduction--listbox {
          max-width: 200px;
          padding: 10px;
          margin: 3px;
          text-align: left;
          margin-left: -140px;
          border-radius: 5px;
          border-color: white;
          overflow: auto;
          outline: auto;
          background: #f4f4f4;
          box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;
          color: #79589f;
          outline-color: white;
        }

        .CustomMenuIntroduction--item {
          padding: 0px;
          border-radius: 0px;
          color: #79589f;
          cursor: pointer;
        }
    
        .CustomMenuIntroduction--item:last-of-type {
          border-bottom: none;
        }
    
        .CustomMenuIntroduction--item.${menuItemClasses.focusVisible} {
          background-color: grey;
          color: white;
        }
    
        .CustomMenuIntroduction--item.${menuItemClasses.disabled} {
          color: #79589f;
        }
    
        .CustomMenuIntroduction--item:hover:not(.${menuItemClasses.disabled}) {
          background-color: grey;
          color: white;
        }
    
        .TriggerButtonIntroduction {
          margin: 0;
          font-family: "Ubuntu", serif;
          padding: 0 auto;
          cursor: pointer;
          background: white;
          align-items: center;
        
          &:hover {
            border-radius: 5px;
            margin-bottom: 1px;
            border: 1px solid #79589f;
          }
        
          &:active {
            border-color: #79589f;
          }
        
          &:focus-visible {
            outline: none;
          }
        }
        
        .CustomMenuIntroduction {
          z-index: 1;
        }
    `}</style>
    );
}

export default SettingsMenu;