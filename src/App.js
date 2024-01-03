import "bootstrap/dist/css/bootstrap.min.css";
import {Route} from 'react-router-dom';
import {Routes} from 'react-router';
import Navbar from "./element/Navbar";
import NoteDetails from "./note/NoteDetails";
import NotesList from './note/NotesList';
import SendMail from "./mail/SendMail";
import AddNote from "./note/AddNote";
import Add from "./element/Add";
import Info from "./element/Info";
import SpaceNavbar from "./element/SpaceNavbar";
import Weather from "./api/Weather";
import Currency from "./api/Currency";
import Space from "./element/Space";
import LoginPage from "./security/LoginPage";
import RegisterPage from "./security/RegisterPage";
import Username from "./element/Username";
import Copyright from "./element/Copyright";
import PasswordChange from "./mail/PasswordChange";

function App() {
    return (
        <div>
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
                    <Route path="/notes/edit/:id" element={<AddNote />}/>
                    <Route path="/notes/:id" element={<NoteDetails />}  />
                    <Route path="/info" element={<Copyright />} />
                    <Route path="/radoslaw-sawicki-frontend-react-notesapp" element={<LoginPage />} />
                    <Route path="/password" element={<PasswordChange />} />
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

