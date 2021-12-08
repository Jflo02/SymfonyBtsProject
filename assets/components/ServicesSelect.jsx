import React, { useEffect } from 'react';
import useState from "react-usestateref";
import axios from 'axios';
import serverAddress from '../consts/ServerAddress';

export default function ServiceSelect({ prop, onSelect }) {

    const [services, setServices, servicesRef] = useState([]);

    //on récupère les services depuis la bdd
    const findServices = async () => {
        const data = axios
            .get(serverAddress + "/api/services")
            .then((response) => setServices(response.data["hydra:member"]));
        // setServices(data);
    }

    //au lancement du composant on récupère les services
    useEffect(() => {
        findServices()

    }, []);
    return (
        <select className="m-3 form-selec form-select-sm w-25" name='service' onChange={onSelect}>
        {/* <select className="m-3 form-selec form-select-sm w-25" name='service' onChange={(service) => prop.current.service = ('/api/services/' + service.target.value)}> */}
            {servicesRef.current.map((service) => (
                < option value={service.id} key={service.id}  >
                    {service.nom}
                </option>
            ))}
        </select>
    )
}