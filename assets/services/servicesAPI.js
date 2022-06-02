import axios from "axios";
import serverAddress from "../consts/ServerAddress";

/**
 * Recupère tous les services de la bdd
 */

function findAll() {
  const data = axios
    .get(serverAddress + "/api/services")
    .then((response) => response.data["hydra:member"]);
  return data;
}

export default {
  findAll,
};
