import React from "react";
import sejoursAPI from "../services/sejoursAPI";
import servicesAPI from "../services/servicesAPI";
import serverAddress from "../consts/ServerAddress";
import axios from "axios";

const HomePage = (props) => {
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
    </div>
  );
};

export default HomePage;
