import React, { useState } from "react";
import { Link } from "react-router-dom";
import Field from "./../components/forms/Field";
import axios from "axios";
import serverAddress from '../consts/ServerAddress';


const PatientPage = (props) => {
  const [patient, setPatient] = useState({
    "lastName": "Aurélien",
    "firstName": "",
    "age": 0,
    "sejours": []
  });

  const [errors, setErrors] = useState({
    lastName: "Le nom est obligatoire",
    firstName: "Le prennom est obligatoire",
    age: "L'age est obligatoire",
  });

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit =  async event => {
    event.preventDefault();

    try{
        console.log(patient)
        const response = await axios.post(serverAddress+'/api/patients', {
            age:Number(patient.age),
            nom:patient.lastName,
            prenom:patient.firstName,
            sejours:patient.sejours
        })
        console.log(response.data);
    } catch(error) {
        console.log(error.response)
    }
  };

  return (
    <>
      <h1>Création d'un patient</h1>

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
