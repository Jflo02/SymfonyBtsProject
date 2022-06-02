import React from "react";
import litsAPI from "../services/litsAPI";
const HomePage = (props) => {
  const debug = async () => {
    const debug = await litsAPI.findLitsLibre();
    console.log(debug);
  };
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
      <button onClick={() => debug()}>DEBUG</button>
    </div>
  );
};

export default HomePage;
