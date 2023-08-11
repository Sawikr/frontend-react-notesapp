import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "./element/Navbar";
import NoteDetails from "./note/NoteDetails";
import NotesList from './note/NotesList';
import NotFound from './note/NotFound';
import SendMail from "./mail/SendMail";
import AddNote from "./note/AddNote";
import Add from "./element/Add";
import Info from "./element/Info";
import SpaceNavbar from "./element/SpaceNavbar";
import Weather from "./api/Weather";
import Currency from "./api/Currency";
import Space from "./element/Space";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <Space />
                <div>
                    <Switch>
                        <Route exact path="/radoslaw-sawicki-frontend-react-notesapp" component={NotesList} />
                        <Route path="/add" component={AddNote} />
                        <Route path="/notes/email/:id" component={SendMail} />
                        <Route path="/notes/weather" component={Weather} />
                        <Route path="/notes/nbp" component={Currency} />
                        <Route path="/notes/edit/:id" component={AddNote} />
                        <Route path="/notes/:id" component={NoteDetails} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
                <SpaceNavbar />
                <Add />
                <Info />
            </div>
        </BrowserRouter>
    );
}

export default App;

