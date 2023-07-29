import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "./element/Navbar";
import NoteDetails from "./element/NoteDetails";
import NotesList from './element/NotesList';
import NotFound from './element/NotFound';
import AddNote from "./element/AddNote";
import Add from "./element/Add";
import Info from "./element/Info";
import Space from "./element/Space";

function App() {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <div>
                    <Switch>
                        <Route exact path="/" component={NotesList} />
                        <Route path="/add" component={AddNote} />
                        <Route path="/notes/edit/:id" component={AddNote} />
                        <Route path="/notes/:id" component={NoteDetails} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
                <Space />
                <Add />
                <Info />
            </div>
        </BrowserRouter>
    );
}

export default App;

