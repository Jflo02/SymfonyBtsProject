import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "./../components/forms/Field";
import axios from "axios";
import serverAddress from "../consts/ServerAddress";

const PatientPage = (props) => {
  const { id = "new" } = props.match.params;

  const [patient, setPatient] = useState({
    lastName: "",
    firstName: "",
    age: 0,
    sejours: [],
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    age: "",
  });

  const [editing, setEditing] = useState(false);

  const fetchPatient = async (id) => {
    try {
      const data = await axios
        .get(serverAddress + "/api/patients/" + id)
        .then((response) => response.data);
      console.log(data);
      const { nom, prenom, age, sejours } = data;

      setPatient({
        lastName: nom,
        firstName: prenom,
        age: age,
        sejours: sejours,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (id != "new") {
      setEditing(true);
      fetchPatient(id);
    }
    // a chaque fois que l'id a changé
  }, [id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editing) {
        console.log(patient);
        const reponse = await axios.put(serverAddress + "/api/patients/" + id, {
          id: id,
          age: Number(patient.age),
          nom: patient.lastName,
          prenom: patient.firstName,
          sejours: patient.sejours,
        });

        console.log(reponse);
        console.log(reponse.data);
      } else {
        setErrors({});
        const response = await axios.post(serverAddress + "/api/patients", {
          age: Number(patient.age),
          nom: patient.lastName,
          prenom: patient.firstName,
          sejours: patient.sejours,
        });
        
      }
    } catch (error) {
      if (error.response.data.violations) {
        const apiErrors = {};
      }
      error.response.data.violations.forEach((violation) => {
        apiErrors[violations.propertyPath] = violation.message;
      });
      setErrors(apiErrors);
    }
  };

  return (
    <>
      {(!editing && <h1>Création d'un patient</h1>) || (
        <h1>Modification d'un patient</h1>
      )}

      <form onSubmit={handleSubmit}>
        <Field
          name="lastName"
          label="Nom de famille"
          placeholder="Nom de famille"
          value={patient.lastName}
          onChange={handleChange}
          //error={errors.lastName}
        ></Field>
        <Field
          name="firstName"
          label="Prénom"
          placeholder="Prénom du client"
          value={patient.firstName}
          onChange={handleChange}
          //error={errors.firstName}
        ></Field>
        <Field
          name="age"
          label="Age"
          placeholder="Age"
          value={patient.age}
          onChange={handleChange}
          //error={errors.age}
        ></Field>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
        </div>
        <Link to="/patients" className="btn btn-link">
          Retour à la liste des patients
        </Link>
      </form>
    </>
  );
};
export default PatientPage;
