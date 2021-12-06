import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "./../components/forms/Field";
import axios from "axios";
import serverAddress from "../consts/ServerAddress";
import patientsAPI from "../services/patientsAPI";
import text from "../consts/text.json";
import logAPI from "../services/logAPI";

const PatientPage = (props) => {
  const { id = "new" } = props.match.params;

  const [requestConfig, setRequestConfig] = useState({
    headers: { "Content-Type": "application/merge-patch+json" },
  });

  const [patient, setPatient] = useState({
    lastName: "",
    firstName: "",
    age: 0,
    sejours: [],
    numeroSecuriteSociale : 0
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    age: "",
  });

  const [editing, setEditing] = useState(false);

  // Recup du patient en focntion de l'id
  const fetchPatient = async (id) => {
    try {
      const data = await patientsAPI.find(id);
      const { nom, prenom, age, sejours, numeroSecuriteSociale } = data
      setPatient({
        lastName: nom,
        firstName: prenom,
        age: age,
        sejours: sejours,
        numeroSecuriteSociale : numeroSecuriteSociale
      });
    } catch (error) {
      console.log(error);
      // todo faire notif
    }
  };
  // Chargement du patient si besoin au changement du composant ou chargement de l'id
  useEffect(() => {
    if (id != "new") {
      setEditing(true);
      fetchPatient(id);
    }
    // a chaque fois que l'id a changé
  }, [id]);

  // Gestion des changements des input dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setPatient({ ...patient, [name]: value });
  };
  // gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editing) {
        const reponse = await axios.patch(
          serverAddress + "/api/patients/" + id,
          {
            age: Number(patient.age),
            nom: patient.lastName,
            prenom: patient.firstName,
            numeroSecuriteSociale : patient.numeroSecuriteSociale
          },
          requestConfig
        );

        await logAPI.log(text["modifPatient"]+ id);
      } else {
        setErrors({});
        // ajout du patient
        const request = await axios.post(serverAddress + "/api/patients", {
          age: Number(patient.age),
          nom: patient.lastName,
          prenom: patient.firstName,
          sejours: patient.sejours,
          numeroSecuriteSociale : patient.numeroSecuriteSociale
        });
        try {
          //ajout dans les logs
          await logAPI.log(text["ajoutPatient"]+ request.data.id);

        } catch (error){
          console.log(error.response)
        }
        
        // TODO : notif de succès
        props.history.replace("/patients");
      }
    } catch ({ response }) {
      const { violations } = response.data;
      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
      }
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

<Field
          name="numeroSecuriteSociale"
          label="numeroSecuriteSociale"
          placeholder="numeroSecuriteSociale"
          value={patient.numeroSecuriteSociale}
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
