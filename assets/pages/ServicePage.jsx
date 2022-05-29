import React, { useState, useEffect } from "react";
import Field from "./../components/forms/Field";
import { Link } from "react-router-dom";
import axios from "axios";
import serverAddress from "../consts/ServerAddress";

const servicePage = (props) => {
  const [Service, setService] = useState([]);
  const [value, setValue] = useState('1');

  const [loading, setloading] = useState(true);

  const [infirmiers, setInfirmiers] = useState({});

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

  useEffect(() => {
    if (Object.keys(infirmiers).length !== 0) setloading(false);
  }, [infirmiers]);

  useEffect(() => {
    console.log(value)
  }, [value]);

  const handleSelect = (selectedOption) => {
    console.log(selectedOption.target.value)
    setValue(selectedOption.target.value)
}
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      axios
        .get(serverAddress + "/api/infirmiers")
        .then((Response) => Response.data["hydra:member"])
        .then((data) => setInfirmiers(data))
        .then(console.log(infirmiers))
        .catch((error) => console.log(error.Response));
    } catch (error) {
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.forEach((violation) => {
          apiErrors[violation.propertyPath] = violation.message;
        });
      }

      console.log(error.reponse);
    }
  };
  return (
    <>
      <h1>Service</h1>

      <form onSubmit={handleSubmit}>
        <div className="row">
          <label className="m-3 max-length">Service </label>
          <select className="m-3 form-selec form-select-sm w-25" name="service" onChange={handleSelect}>
            {Service.map((service) => (
              <option key={service.id} value={service.id}>
                {service.nom}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Enregistrer
          </button>
        </div>
      </form>

      {!loading && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>id</th>
              <th>prénom</th>
              <th>nom</th>
              <th>âge</th>
              <th>service</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {infirmiers.map((infirmiers) => (
              <tr key={infirmiers.id}>
                <td className="text-center">{infirmiers.id}</td>
                <td>{infirmiers.prenom}</td>
                <td>{infirmiers.nom}</td>
                <td className="text-center">{infirmiers.age}</td>
                <td>{infirmiers.service.nom}</td>
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default servicePage;
