import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import serverAddress from "../consts/ServerAddress";

const SejoursPage = (props) => {
  const [sejoursEnCours, setSejoursEnCours] = useState([]);
  const [isSejourLong, setIsSejourLong] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(serverAddress + "/api/sejours?exists[dateSortie]=false")
      .then((response) => response.data["hydra:member"])
      .then((data) => setSejoursEnCours(data))
      .catch((error) => console.log(error.response));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const itemsPerpage = 10;
  const pagesCount = Math.ceil(sejoursEnCours.length / itemsPerpage);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const orderSejoursByNumberOfDay = () => {
    sejoursEnCours.forEach((sejour) => {
      console.log("Date.now()");
      console.log(Date.now());
      console.log(sejour.dateEntree);
      console.log(typeof Date.parse(sejour.dateEntree));
    });
    console.log();
  };

  const debug = () => {
    console.log(isSejourLong);
    // orderSejoursByNumberOfDay();
  };

  function difference(date1, date2) {
    const date1utc = Date.UTC(
      date1.getFullYear(),
      date1.getMonth(),
      date1.getDate()
    );
    const date2utc = Date.UTC(
      date2.getFullYear(),
      date2.getMonth(),
      date2.getDate()
    );
    const day = 1000 * 60 * 60 * 24;
    return (date2utc - date1utc) / day;
  }

  const filteredSejoursEnCours = sejoursEnCours;

  // d'ou on part (start) pendant combien (itemsPerpage)
  const start = currentPage * itemsPerpage - itemsPerpage;
  //               3 *         10           - 10   = 20
  const pagignatedSejoursEnCours =
    filteredSejoursEnCours.length > itemsPerpage
      ? filteredSejoursEnCours.slice(start, start + itemsPerpage)
      : filteredSejoursEnCours;

  const getInputValue = (event) => {
    // show the user input value to console
    const userValue = event.target.value;

    console.log(userValue);
  };

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des Séjours</h1>
      </div>

      <button onClick={() => debug()}>DEBUG</button>
      <button onClick={() => setIsSejourLong(!isSejourLong)}>
        Switch durée séjour
      </button>
      <div>
        <input
          type="radio"
          id="sejourCourt"
          name="sejour"
          value="true"
          checked
          onChange={() => console.log("lala")}
        />
        <label>Séjour court</label>
        <input
          type="radio"
          id="sejourLong"
          name="sejour"
          value="false"
          onChange={() => console.log("lolo")}
        />
        <label>Séjour Long</label>
      </div>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Prenom</th>
            <th>Nom</th>
            <th>Motif</th>
            <th>Service</th>
            <th>Date d'admission</th>
            <th>Durée</th>
          </tr>
        </thead>
        <tbody>
          {isSejourLong &&
            pagignatedSejoursEnCours.map(
              (sejour) =>
                difference(new Date(sejour.dateEntree), new Date()) > 10 && (
                  <tr key={sejour.id}>
                    <td>{sejour.patient.prenom}</td>
                    <td>{sejour.patient.nom}</td>
                    <td>{sejour.raisonAdmission}</td>
                    <td>{sejour.services.at(-1).service.nom}</td>
                    <td>{sejour.dateEntree}</td>
                    <td>
                      {difference(new Date(sejour.dateEntree), new Date())}
                    </td>
                  </tr>
                )
            )}
          {!isSejourLong &&
            pagignatedSejoursEnCours.map(
              (sejour) =>
                difference(new Date(sejour.dateEntree), new Date()) < 10 && (
                  <tr key={sejour.id}>
                    <td>{sejour.patient.prenom}</td>
                    <td>{sejour.patient.nom}</td>
                    <td>{sejour.raisonAdmission}</td>
                    <td>{sejour.services.at(-1).service.nom}</td>
                    <td>{sejour.dateEntree}</td>
                    <td>
                      {difference(new Date(sejour.dateEntree), new Date())}
                    </td>
                  </tr>
                )
            )}
        </tbody>
      </table>

      <div>
        <ul className="pagination pagination-sm">
          <li className={"page-item" + (currentPage === 1 && "disabled")}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &laquo;
            </button>
          </li>

          {pages.map((page) => (
            <li
              key={page}
              className={"page-item" + (currentPage === page && "active")}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={"page-item" + (currentPage === pagesCount && "disabled")}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &raquo;
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SejoursPage;
