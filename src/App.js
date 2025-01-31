import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router';
import Navbar from './element/Navbar';
import NoteDetails from './note/NoteDetails';
import NotesList from './note/NotesList';
import SendMail from './mail/SendMail';
import AddNote from './note/AddNote';
import Add from './element/Add';
import Info from './element/Info';
import SpaceNavbar from './element/SpaceNavbar';
import Weather from './api/Weather';
import Currency from './api/Currency';
import Space from './element/Space';
import LoginPage from './security/LoginPage';
import RegisterPage from './security/RegisterPage';
import Username from './element/Username';
import Copyright from './element/Copyright';
import PasswordChange from './mail/PasswordChange';
import ResetPassword from './mail/ResetPassword';
import ModalAutoLogoutAlert from './alert/modal/ModalAutoLogoutAlert';
import {useState} from 'react';
import {useNavigate} from 'react-router';
import {isUserLoggedIn, logoutToken} from './service/LoginService';
import useIdle from './hooks/useIdleTimeout';
import Shares from './api/Shares';

function App() {
    const [timeout, setTimeout] = useState(1000 * 60);
    const [promptBeforeIdle, setPromptBeforeIdle] = useState(1000 * 0.5);
    const [stateNotes, setStateNotes] = useState(' ');
    const [remaining, setRemaining] = useState(0);
    const [autoLogoutAlert, setAutoLogoutAlert] = useState(false);
    const [isNotesClick, setIsNotesClick] = useState(false);
    const [event, setEvent] = useState('Event');
    const isAuth = isUserLoggedIn();
    const navigate = useNavigate();

    const onHandlePrompt = () => {
        if (isAuth) {
            setStateNotes('Prompted');
            setAutoLogoutAlert(true);
            if (isNotesClick === true) {
                //console.log('isNotesClick: ' + isNotesClick);
                setIsNotesClick(false);
                setStateNotes('Active');
                setAutoLogoutAlert(false);
            }

            if (stateNotes.match("Prompted")) {
                setAutoLogoutAlert(false);
                logoutToken(true);
                navigate("/notes/list");
                window.location.reload();
            }
        }
    }

    const onHandleAction = () => {
        setStateNotes('Action');
        //console.log('User is action');
        idleTimer.reset();
    }

    /**
     * Must only be called in the App class
     * @type {IIdleTimer}
     */
    const idleTimer = useIdle({
        onHandlePrompt: onHandlePrompt,
        handleStillHere: getModalAutoLogoutAlert,
        onHandleAction: onHandleAction
    });

    function getModalAutoLogoutAlert(isNotesClick){
        setStateNotes('Active');
        console.log('User is active');
        idleTimer.reset();
        idleTimer.start();
        setIsNotesClick(isNotesClick);
    }

    return (
        <div>
            {
                autoLogoutAlert &&
                <ModalAutoLogoutAlert
                    getAutoLogoutAlert={getModalAutoLogoutAlert}
                    getRemainingTime={idleTimer.getRemainingTime}
                    timeout={timeout}
                    promptBeforeIdle={promptBeforeIdle}
                />
            }
            <Navbar />
            <Username />
            <Space />
            <div>
                <Routes>
                    <Route exact path="/notes/list" element={<NotesList />} />
                    <Route path="/add" element={<AddNote />} />
                    <Route path="/notes/auth/register" element={<RegisterPage />} />
                    <Route path="/notes/email/:id" element={<SendMail />} />
                    <Route path="/notes/weather" element={<Weather />} />
                    <Route path="/notes/nbp" element={<Currency />} />
                    <Route path="/notes/shares" element={<Shares />} />
                    <Route path="/notes/edit/:id" element={<AddNote />}/>
                    <Route path="/notes/:id" element={<NoteDetails />}  />
                    <Route path="/info" element={<Copyright />} />
                    <Route path="/radoslaw-sawicki-frontend-react-notesapp" element={<LoginPage />} />
                    <Route path="/password" element={<PasswordChange />} />
                    <Route path="/reset" element={<ResetPassword />} />
                    <Route path="*" element={<LoginPage />} />
                </Routes>
            </div>
            <SpaceNavbar />
            <Add />
            <Info/>
        </div>
    );
}

export default App;

