import React, { useContext, useState } from "react";
import axios from "axios";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import LogAPI from "../services/logAPI";
import text from "../consts/text.json"

const LoginPage = ({ history }) => {
  const { setIsAuthenticated } = useContext(AuthContext);

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
      setIsAuthenticated(true);
      localStorage.setItem('username', credentials.username);
      
    } catch (error) {
      setError("Aucun compte ne possède cette adresse");
    }
    try {
        await LogAPI.log(text["connexionOK"]);
        history.replace("/");
    } catch (error){
      setError("pas de connexion");

    }
  };

  return (
    <>
      <h1>Connexion</h1>

      <form onSubmit={handleSubmit}>
        <Field
          label="Adresse email"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Adresse email de connexion"
          error={error}
        />
        <Field
          label="Mot de passe"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          error=""
          type="password"
        />

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
