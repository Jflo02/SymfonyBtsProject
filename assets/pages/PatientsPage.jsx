



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import serverAddress from "../consts/ServerAddress";

const PatientsPage = (props) => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(serverAddress + "/api/patients")
      .then((response) => response.data["hydra:member"])
      .then((data) => setPatients(data))
      .catch((error) => console.log(error.response));
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const itemsPerpage = 10;
  const pagesCount = Math.ceil(patients.length / itemsPerpage);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
  };

  const filteredPatients = patients.filter(
    (p) =>
      p.prenom.toLowerCase().includes(search.toLowerCase()) ||
      p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.age == search ||
      p.numeroSecuriteSociale.toString().includes(search.toString())
  );

  // d'ou on part (start) pendant combien (itemsPerpage)
  const start = currentPage * itemsPerpage - itemsPerpage;
  //               3 *         10           - 10   = 20
  const pagignatedPatients =
    filteredPatients.length > itemsPerpage
      ? filteredPatients.slice(start, start + itemsPerpage)
      : filteredPatients;

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des patients</h1>
        <Link to="/patients/new" className="btn btn-primary">
          Ajouter
        </Link>
      </div>
      <div className="form-group">
        <input
          type="text"
          onChange={handleSearch}
          value={search}
          className="form-control"
          placeholder="Recherche ..."
        />
      </div>

      <table className="table table-hover">
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Prenom</th>
            <th>Nom</th>
            <th>Age</th>
            <th>Numero de sécurité social</th>
            <th>Prise en charge</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {pagignatedPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.prenom}</td>
              <td>{patient.nom}</td>
              <td>{patient.age}</td>
              <td>{patient.numeroSecuriteSociale}</td>
              <td>
                <Link
                  to={{
                    pathname: "/sejours",
                    aboutProps: {
                      patient: patient,
                    },
                  }}
                >
                  Prise en charge
                </Link>
              </td>

              <td>
                <Link
                  to={"/patients/" + patient.id}
                  className="btn btn-sm btn-primary mr-1"
                >
                  Modifier patient
                </Link>
              </td>
            </tr>
          ))}
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

export default PatientsPage;
