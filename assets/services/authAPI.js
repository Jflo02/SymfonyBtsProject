import axios from 'axios';
import jwtDecode from "jwt-decode";

function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}
function authentificate(credentials) {

    return axios
        .post("http://127.0.0.1:8000/api/login_check", credentials)
        .then((response) => response.data.token)
        .then(token => { 
               // je stock le token dans le localstorage
            window.localStorage.setItem("authToken", token);
            // on previent axios qu'on a mtn un header par défaut sur toutes nos futures requetes http
            setAxiosToken(token);
            
            return true;
        });
}


function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

function setup(){
    //1. voir si on a un token
    const token = window.localStorage.getItem("authToken")

    //2. si le token est encore valide

    if(token){
        const {exp: expiration} =jwtDecode(token)
        if(expiration  * 1000 > new Date().getTime()){
        setAxiosToken(token);
        }
    }

}

function isAuthenticated(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const {exp: expiration} =jwtDecode(token)
        if(expiration  * 1000 > new Date().getTime()){
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authentificate,
    logout,
    setup,
    isAuthenticated
};