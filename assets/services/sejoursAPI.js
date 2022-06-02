import axios from "axios";
import serverAddress from "../consts/ServerAddress";

function findAll() {
  const data = axios
    .get(serverAddress + "/api/sejours")
    .then((response) => response.data["hydra:member"]);
  return data;
}

function findSejoursEnCours() {
  const data = axios
    .get(serverAddress + "/api/sejours?exists[dateSortie]=false")
    .then((response) => response.data["hydra:member"]);
  return data;
}

export default {
  findAll,
  findSejoursEnCours,
};
