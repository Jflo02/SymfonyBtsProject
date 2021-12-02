import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientsPage = (props) => {
  const [patients, setPatients] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/patients")
      .then((response) => response.data["hydra:member"])
      .then((data) => setPatients(data))
      .catch((error) => console.log(error.response));
  }, []);

  const handlePageChange = (page) =>{
    setCurrentPage(page);
  }
  const itemsPerpage = 10;
  const pagesCount = Math.ceil(patients.length / itemsPerpage);
  const pages = [];
  console.log(" page count ="+ pagesCount)
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }


  // d'ou on part (start) pendant combien (itemsPerpage)
  const start = currentPage * itemsPerpage - itemsPerpage;
  //               3 *         10           - 10   = 20 
  const pagignatedPatients = patients.slice(start, start + itemsPerpage);


  console.log(pages);
  console.log('Current page =' +currentPage)
  return (
    <>
      <h1>Liste des patients</h1>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Identifiant</th>
            <th>Prenom</th>
            <th>Nom</th>
            <th>Age</th>
            <th>Pris en charge</th>
            <th></th>
            <th></th>
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
              <td>Par emma en cardiologie</td>
              <td>
                <button className="btn btn-sm btn-danger">Supprimer</button>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <ul className="pagination pagination-sm">
          <li className={"page-item" + (currentPage ===1 && "disabled")}>
            <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
              &laquo;
            </button>
          </li>

          {pages.map((page) => (
            <li
              key={page}
              
              className={"page-item" + (currentPage === page && "active")}>
              <button className="page-link" onClick= {() => handlePageChange(page)}>
                {page}
              </button>
            </li>
          ))}
          <li className={"page-item" + (currentPage === pagesCount && "disabled")}>
          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
              &raquo;
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default PatientsPage;
