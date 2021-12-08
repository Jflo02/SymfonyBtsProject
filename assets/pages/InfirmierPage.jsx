import React, { useState, useEffect } from 'react';
import Field from './../components/forms/Field'
import { Link } from 'react-router-dom';
import axios from 'axios';

const infirmiersPage = (props,) => {

    const { id = "new" } = props.match.params;

    const [Service, setService] = useState([])

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
        try {
            const data = await axios
                .get("http://localhost:8000/api/infirmiers/" + id)
                .then(response => response.data);
            const { prenom, nom, age, service } = data;

            setInfirmiers({
                firstName: prenom,
                lastName: nom,
                age: age,
                service: service
            })
        } catch (error) {
            console.log(error.response);

        }
    };


    useEffect(() => {
        if (id !== "new") {
            setEditing(true);
            fetchInfirmier(id)
        }
    }, [id]);

    const fetchService = async id => {
        try {
            const data = await axios.get("http://localhost:8000/api/services/" + id)
            .then(response => response.data);
            setService(data);
            console.log(response.data)
        } catch (error) {
            console.log(error.reponse)
        }
    }

    useEffect(() => {
        fetchService();
    }, [])


    const handleChange = ({ currentTarget }) => {
        const { name, value } = currentTarget;
        setInfirmiers({ ...infirmiers, [name]: value });

    }


    const handleSubmit = async event => {
        event.preventDefault();
        console.log(infirmiers)

        try {
            if (editing) {
                const reponse = await axios.put("http://127.0.0.1:8000/api/infirmiers/" + id, {
                    id: id,
                    age: Number(infirmiers.age),
                    nom: infirmiers.lastName,
                    prenom: infirmiers.firstName,
                    service: infirmiers.service,
                });
                console.log(response.data)
            }
            const response = await axios.post("http://127.0.0.1:8000/api/infirmiers", {
                age: Number(infirmiers.age),
                nom: infirmiers.lastName,
                prenom: infirmiers.firstName,
                service: infirmiers.service,
            });
            setErrors({});
        } catch (error) {
            if (error.response.data.violations) {
                const apiErrors = {};
                error.response.data.violations.forEach(violation => {
                    apiErrors[violation.propertyPath] = violation.message;
                })
            }

            console.log(error.reponse)

        }
        fetchService(Service)




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

                <div className="row">
                    <label className="m-3 max-length">Service </label>
                    <select  className="m-3 form-selec form-select-sm w-25" name='service'>
                        {Service.map(service => <option key={service.id} value={service.id}> {service.nom} </option>)}
                    </select>

                </div>

                <div className="form-group">
                    <button type="submit" className="btn btn-success">Enregistrer</button>
                    <Link to="/infirmier" className="btn btn-link">Retour à la liste</Link>
                </div>
            </form>

        </>
    );
}

export default infirmiersPage;
