import axios from "axios";
import jwtDecode from "jwt-decode";

/**
 * Recupère tous les services de la bdd
 */

function findAll() {
  const data = axios
    .get("http://127.0.0.1:8000/api/services")
    .then((response) => response.data["hydra:member"]);
  return data;
}

export default {
  findAll,
};
