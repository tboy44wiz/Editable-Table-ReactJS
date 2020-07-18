import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import './App.css';

// Importing of Components
import AppContextProvider from "./context/AppContextProvider";
import TableComponent from './components/TableComponents.js';
import AddAccountComponent from './components/AddAccountComponent.js';
import EditUserComponent from './components/EditUserComponent.js';

class App extends React.Component {

    render() {
        return (
            <AppContextProvider>
                <div className="App container-fluid">
                    <Router>
                        <Route exact path= "/"  component= { TableComponent } />
                        <Route path= "/add-account" component= { AddAccountComponent } />
                        <Route path= "/edit-user/:userId" component= { EditUserComponent } />
                    </Router>
                </div>
            </AppContextProvider>
        );
    }
}

export default App;
