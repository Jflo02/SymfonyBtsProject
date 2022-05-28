import React, { useState, useEffect } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";
import axios from "axios";
import serverAddress from "../consts/ServerAddress";
import ServiceSelect from "../components/ServicesSelect";

const infirmiersPage = (props) => {
  const { id = "new" } = props.match.params;

  const [service, setService] = useState([]);

  const [infirmier, setInfirmier] = useState({
    lastName: "",
    firstName: "",
    age: 0,
    service: "",
  });

  const [errors, setErrors] = useState({
    lastName: "Le nom est obligatoire",
    firstName: "",
    age: 0,
    service: "",
  });

  const [editing, setEditing] = useState(false);

  const fetchInfirmier = async (id) => {
    try {
      const data = await axios
        .get(serverAddress + "/api/infirmiers/" + id)
        .then((response) => response.data);
      const { prenom, nom, age, service } = data;

      setInfirmier({
        firstName: prenom,
        lastName: nom,
        age: age,
        service: service,
      });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchInfirmier(id);
    }
  }, [id]);

  const fetchService = async () => {
    try {
      const data = await axios
        .get(serverAddress + "/api/services/")
        .then((response) => response.data["hydra:member"]);
      setService(data);
    } catch (error) {
      console.log(error.reponse);
    }
  };

  useEffect(() => {
    fetchService();
  }, []);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setInfirmier({ ...infirmier, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editing) {
        const reponse = await axios.put(
          serverAddress + "/api/infirmiers/" + id,
          {
            id: id,
            age: Number(infirmier.age),
            nom: infirmier.lastName,
            prenom: infirmier.firstName,
            service: infirmier.service,
          }
        );
      }

      const response = await axios.post(serverAddress + "/api/infirmiers", {
        age: Number(infirmier.age),
        nom: infirmier.lastName,
        prenom: infirmier.firstName,
        service: infirmier.service,
      });
      setErrors({});
    } catch (error) {
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
      }

      console.log(error.reponse);
    }
    fetchService(service);
  };

  const handleSelectService = (selectedOption) => {
    console.log(selectedOption.target.value);
    setInfirmier({
      ...infirmier,
      service: "/api/services/" + selectedOption.target.value,
    });
  };

  return (
    <>
      {(!editing && <h1>Création d'un infirmier</h1>) || (
        <h1>Modification de l'infirmier</h1>
      )}

      <form onSubmit={handleSubmit}>
        <Field
          name="lastName"
          label="nom"
          placeholder="nom de la personne"
          value={infirmier.lastName}
          onChange={handleChange}
          //error={errors.lastName}
        />
        <Field
          name="firstName"
          label="prenom"
          placeholder="prenom de la personne"
          value={infirmier.firstName}
          onChange={handleChange}
          //error={errors.firstName}
        />
        <Field
          name="age"
          label="age"
          placeholder="âge de la personne"
          value={infirmier.age}
          onChange={handleChange}
          //error={errors.age}
        />

        <div className="row">
          <ServiceSelect
            prop={service}
            onSelect={(service) => handleSelectService(service)}
          />
          {/* <label className="m-3 max-length">Service </label>
          <select className="m-3 form-selec form-select-sm w-25" name="service">
            {service.map((service) => (
              <option key={service.id} value={service.id}>
                {service.nom}
              </option>
            ))}
          </select> */}
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
          <Link to="/infirmier" className="btn btn-link">
            Retour à la liste
          </Link>
        </div>
      </form>
    </>
  );
};

export default infirmiersPage;
