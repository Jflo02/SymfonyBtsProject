import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import serverAddress from "../consts/ServerAddress";

const infirmierPage = (props) => {
  const [infirmiers, setInfirmiers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(serverAddress + "/api/infirmiers")
      .then((Response) => Response.data["hydra:member"])
      .then((data) => setInfirmiers(data))
      .catch((error) => console.log(error.Response));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(serverAddress + "/api/infirmiers/" + id)
      .then((Response) => console.log(Response));
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    const value = event.currentTarget.value;
    setSearch(value);
  };

  const itemsPerPage = 5;

  const filteredInfirmier = infirmiers.filter(
    (c) =>
      c.prenom.toLowerCase().includes(search.toLowerCase()) ||
      c.nom.toLowerCase().includes(search.toLowerCase())
  );

  const pageCount = Math.ceil(infirmiers.length / itemsPerPage);
  const pages = [];

  for (let i = 1; i <= pageCount; i++) {
    pages.push(i);
  }

  const start = currentPage + itemsPerPage - itemsPerPage;
  const paginatedInfirmier =
    filteredInfirmier.length > itemsPerPage
      ? filteredInfirmier.slice(start, start + itemsPerPage)
      : filteredInfirmier;

  return (
    <>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h1>Liste des infirmiers</h1>
        <Link to="/infirmier/new" className="btn btn-primary">
          Créer un infirmier
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
            <th>id.</th>
            <th>prénom</th>
            <th>nom</th>
            <th>âge</th>
            <th>service</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {paginatedInfirmier.map((infirmiers) => (
            <tr key={infirmiers.id}>
              <td className="text-center">{infirmiers.id}</td>
              <td>{infirmiers.prenom}</td>
              <td>{infirmiers.nom}</td>
              <td className="text-center">{infirmiers.age}</td>
              <td>{infirmiers.service.nom}</td>
              <td>
                <button
                  onClick={() => handleDelete(infirmiers.id)}
                  className="btn btn-sm btn-danger"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <ul className="pagination pagination-sm">
          {pages.map((page) => (
            <li
              key={page}
              className={"page-item" + (currentPage === page && "active")}
            >
              <button
                className="page-link"
                onClick={() => handleChangePage(page)}
              >
                {page}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default infirmierPage;
