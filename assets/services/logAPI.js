import axios from 'axios';
import serverAddress from '../consts/ServerAddress';





function log(description){

    const username =  window.localStorage.getItem("username")
    console.log(username)
    const data = axios  
    .post(serverAddress+"/api/logs",{
        "date": new Date(),
        "email": username,
        "description": description
    })
    return data
}

export default {
    log
};
