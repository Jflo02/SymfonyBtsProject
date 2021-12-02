import React, { useState } from "react";

import './styles/app.css';
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route, withRouter, Redirect } from "react-router-dom";
import PatientsPage from "./pages/PatientsPage";
import Sejours from "./pages/Sejours";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";
import AuthContext from './contexts/AuthContext';
import PrivateRoute from "./components/PrivateRoute";
import contextValue from './contexts/AuthContext';
import PatientPage from './pages/PatientPage';

AuthAPI.setup();



const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated)

    const NavbarWithRouter  = withRouter(Navbar);

    return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        <HashRouter> 
            <NavbarWithRouter/>

            <main className="container pt-5">
                <Switch>
                    <Route path="/login"  component={LoginPage} />
                    <PrivateRoute path="/patients" component={PatientsPage}/>
                    <PrivateRoute path="/patients/:id" component={PatientPage}/>
                    <PrivateRoute path="/sejours" component={Sejours}/>
                    
                    <Route path="/" component={HomePage}/>
                </Switch>
            </main>         
            </HashRouter>
    </AuthContext.Provider>
    )};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)