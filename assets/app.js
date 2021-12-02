import React, { useState } from "react";

import './styles/app.css';
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route, withRouter } from "react-router-dom";
import PatientsPage from "./pages/PatientsPage";
import Sejours from "./pages/Sejours";
import LoginPage from "./pages/LoginPage";
import AuthAPI from "./services/authAPI";

AuthAPI.setup();

const App = () => {
    const [isAuthenticated, setAuthenticated] = useState(AuthAPI.isAuthenticated)

    const NavbarWithRouter  = withRouter(Navbar)
    return (
    <HashRouter> 
    <NavbarWithRouter isAuthenticated= {isAuthenticated} onLogout={setAuthenticated}/>

    <div className="container pt-5">
        <Switch>
            <Route path="/login"  render={(props) => <LoginPage onLogin={setAuthenticated} {...props} />}/>
            <Route path="/patients" component={PatientsPage}/>
            <Route path="/sejours" component={Sejours}/>
            <Route path="/" component={HomePage}/>
        </Switch>
    </div>         
    </HashRouter>
    )};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)