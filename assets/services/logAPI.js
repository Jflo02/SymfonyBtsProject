import axios from 'axios';
import serverAddress from '../consts/ServerAddress';

function logConnexion(email){
    console.log("logconnexion")
    const data = axios  
    .post(serverAddress+"/api/logs",{
        "date": new Date(),
        "email": email,
        "description": "Connexion à l'application"
    })

    return data
}

export default {
    logConnexion
};
