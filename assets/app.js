import React from "react";

import './styles/app.css';
import ReactDOM from "react-dom";
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage";
import { HashRouter, Switch, Route } from "react-router-dom";
import PatientsPage from "./pages/PatientsPage";
import Sejours from "./pages/Sejours";

console.log("Hello Wolrd !!");

const App = () => {
    return (
    <HashRouter> 
    <Navbar/>

    <div className="container pt-5">
        <Switch>
            <Route path="/patients" component={PatientsPage}/>
            <Route path="/sejours" component={Sejours}/>
            <Route path="/" component={HomePage}/>
            </Switch>
    </div>         
    </HashRouter>
    )};

const rootElement = document.querySelector('#app');
ReactDOM.render(<App/>, rootElement)