import axios from "axios";
import serverAddress from "../consts/ServerAddress";

function find(id){
    return axios
        .get(serverAddress + "/api/patients/" + id)
        .then((response) => response.data);
}


export default {
    find
};