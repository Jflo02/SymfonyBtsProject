import React, { useState } from "react";
import axios from "axios";
import AuthAPI from "../services/authAPI";

const LoginPage = ({onLogin, history}) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

// gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;

    setCredentials({ ...credentials, [name]: value });
  };


  // gestion du submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await AuthAPI.authentificate(credentials);
      setError("");
      onLogin(true);
      history.replace("/");
    } catch (error) {
      setError("Aucun compte ne possède cette adresse");
    }
  };

  return (
    <>
      <h1>hello</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username"> Adresse email</label>
          <input
            value={credentials.username}
            onChange={handleChange}
            type="email"
            placeholder="Adresse email de connexion"
            name="username"
            className={"form-control" + (error && "is-invalid")}
            id="username"
          />
          {error && <p className="invalid-feedback">{error}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password"> Mot de passe</label>
          <input
            value={credentials.password}
            onChange={handleChange}
            type="password"
            placeholder="mot de passe"
            name="password"
            className="form-control"
            id="password"
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-success">
            Je me connecte
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
