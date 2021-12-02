import React, { useEffect, useState } from "react";
import axios from "axios";

const PatientsPage = (props) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/patients")
      .then((response) => response.data["hydra:member"])
      .then((data) => setPatients(data))
      .catch(error => console.log(error.response))
  }, []);
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
          {patients.map((patient) => 
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
          )}
        </tbody>
      </table>
    </>
  );
};

export default PatientsPage;
