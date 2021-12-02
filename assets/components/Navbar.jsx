import React, { useContext } from 'react';
import AuthAPI from '../services/authAPI';
import { NavLink } from 'react-router-dom'
import AuthContext from '../contexts/AuthContext';


const Navbar = ({ history}) => {

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const handlelogout = () => {
    AuthAPI.logout();
    setIsAuthenticated(false);
    history.push("/login")
  }
    return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
    <div className="container-fluid">
      <NavLink className="navbar-brand" to="/">Hopital</NavLink>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
  
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/patients">Patient</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/infirmier">Infirmier</NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/chambres">Chambres</NavLink>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          {(!isAuthenticated && (
          
          <>
          <li className="nav-item">
                <NavLink to="/login" className="btn btn-success"> Connexion</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/register" className="btn nav-link"> Inscription</NavLink>
            </li> 
            </>
          )) || (
      <li className="nav-item">
        <button onClick={handlelogout} className="btn btn-danger"> Déconnexion</button>
      </li>
          )
            }
            
            
            </ul>
      </div>
    </div>
  </nav>  );
}
 
export default Navbar;