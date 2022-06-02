import React, { useEffect } from "react";
import serverAddress from "../consts/ServerAddress";
import axios from "axios";
import useState from "react-usestateref";

const HomePage = (props) => {
  const [lits, setLits, litsRef] = useState([]);
  const [litsOccupe, setLitsOccupe, litsOccupeRef] = useState([]);

  const fetchLits = async () => {
    const data = await axios
      .get(serverAddress + "/api/lits")
      .then((response) => response.data["hydra:member"]);
    setLits(data);
    //on filtre les lits pour ne garder que ceux qui sont disponibles
    LitsOccupation();
  };

  const LitsOccupation = () => {
    litsRef.current.forEach((lit) => {
      //lit occupé si sejour.lenght > 0 et Last sejour.dateSortie is null
      if (lit.sejours.length > 0) {
        const dateSortieDernierSejour = Date.parse(
          lit.sejours.at(-1).dateSortie
        );
        if (
          dateSortieDernierSejour > Date.now() ||
          isNaN(dateSortieDernierSejour)
        ) {
          setLitsOccupe([...litsOccupeRef.current, lit]);
        }
      }
    });
  };

  useEffect(() => {
    fetchLits();
  }, []);

  return (
    <div className="list-group">
      <a
        href="#"
        className="list-group-item list-group-item-action flex-column align-items-start"
      >
        <div className="d-flex w-100 justify-content-between">
          <h5 className="mb-1">Epsi Hopital</h5>
          <small className="text-muted">3 days ago</small>
        </div>
        <p className="mb-1">
          Bienvenue sur la platerfome de gestion de l'hopital Epsi
        </p>
        <small className="text-muted">
          Vous pouvez vous authentifier si vous êtes un personnel administratif
          ou infirmier grâce au bouton connexion dans le coin superieur droit
        </small>
      </a>

      <h3 className="m-5">
        {(litsOccupe.length / lits.length) * 100} % des lits occupés (
        {litsOccupe.length} / {lits.length})
      </h3>
    </div>
  );
};

export default HomePage;
