import React, { useState, useEffect } from 'react';
import Field from './../components/forms/Field'
import { Link } from 'react-router-dom';
import axios from 'axios';

const infirmiersPage = (props) => {

    const { id = "new" } = props.match.params;

    

    const [infirmiers, setInfirmiers] = useState({
        lastName: "",
        firstName: "",
        age: 0,
        service: ""
    })

    const [errors, setErrors] = useState({
        lastName: "Le nom est obligatoire",
        firstName: "",
        age: 0,
        service: ""     
    })

    const [editing, setEditing] = useState(false);
    
    const fetchInfirmier = async id => {
        try{
            const data = await axios
            .get("http://localhost:8000/api/infirmier/" + id)
            .then(response => response.data);
            console.log(data)
        }catch(error) {
            console.log(error.response);

        }
    };


    useEffect(() => {
        if(id !== "new") {
            setEditing(true);
            fetchInfirmier(id)
        }   
    }, [id]);



    const handleChange = ({currentTarget}) => {
        const {name, value} = currentTarget;
        setInfirmiers({...infirmiers, [name]: value});
    }

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            await axios.post("http://localhost:8000/api/infirmier", infirmiers);
            setErrors({});
        } catch(error){
            if(error.response.dat.violations){
                const apiErrors = {};
                error.response.date.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                })
            }
        }

        setErrors(apiErrors);
    }
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
                    value={infirmiers.lastName}
                    onChange={handleChange}
                    //error={errors.lastName}
                />
                <Field
                    name="firstName"
                    label="prenom"
                    placeholder="prenom de la personne"
                    value={infirmiers.firstName}
                    onChange={handleChange}
                    //error={errors.firstName}
                />
                <Field
                    name="age"
                    label="age"
                    placeholder="âge de la personne"
                    value={infirmiers.age}
                    onChange={handleChange}
                    //error={errors.age}
                />
                <Field
                    name="service"
                    label="service"
                    placeholder="service"
                    value={infirmiers.service}
                    onChange={handleChange}
                    //error={errors.service}

                />

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/infirmier" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>

        </>
    );
}

export default infirmiersPage;