import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from "./element/Navbar";
import NotesList from './element/NotesList';
import NotFound from './element/NotFound';

function App() {
    return (
        <BrowserRouter>
            <div>
                <Navbar />
                <div>
                    <Switch>
                        <Route exact path="/" component={NotesList} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;

