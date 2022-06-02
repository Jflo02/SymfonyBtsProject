import axios from "axios";
import serverAddress from "../consts/ServerAddress";

function find(id) {
  return axios
    .get(serverAddress + "/api/lits/" + id)
    .then((response) => response.data);
}

function findAll() {
  const data = axios
    .get(serverAddress + "/api/lits/")
    .then((response) => response.data["hydra:member"]);
  return data;
}

function findLitsOccupe() {
  const allLits = axios
    .get(serverAddress + "/api/lits/")
    .then((response) => response.data["hydra:member"]);
  //   const litsOccupe = [];
  /*allLits.forEach((lit) => {
    if (lit.sejours.length > 0) {
      const dateSortieDernierSejour = Date.parse(lit.sejours.at(-1).dateSortie);
      if (
        dateSortieDernierSejour > Date.now() ||
        isNaN(dateSortieDernierSejour)
      ) {
        litsOccupe.push(lit);
      }
    }
  });*/
  return typeof allLits;
}

export default {
  find,
  findAll,
  findLitsOccupe,
};
