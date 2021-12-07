import axios from 'axios';
import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import useState from 'react-usestateref';
import serverAddress from '../../consts/ServerAddress';
import ServiceSelect from '../ServicesSelect';

export default function NewSejour({ nouveauSejourRef, litsAvailableRef, servicesRef }) {

    //date au format du DatePicker pour l'afficher
    const [dateHook, setDateHook] = useState(new Date());
    const [serviceSejour, setServiceSejour, serviceSejourRef] = useState({
        "dateEntree": nouveauSejourRef.current.dateEntree,
        "sejour": "",
        "service": ""
    })

    //envoie du formulaire
    const handleSubmit = async event => {
        event.preventDefault();
        let idSejour = 0;
        try {
            const response = await axios.post(serverAddress + "/api/sejours", nouveauSejourRef.current);
            idSejour = response.data.id
        } catch (error) {
            console.log(error.response);
        }
        postService(idSejour);
    }

    //Ajout dans la table serviceSejour de la relation entre le sejour et le service
    const postService = async (id) => {
        try {
            const postSejour = axios.post(serverAddress + "/api/service_sejours", {
                "dateEntree": serviceSejourRef.current.dateEntree,
                "sejour": "/api/sejours/" + id,
                "service": serviceSejourRef.current.service
            })
        }
        catch (error) {
            console.log(error.response)
        }
    }

    //Formate la date au bon format pour l'api
    //affecte la date au séjour et au serviceSejour
    const formatDate = (date) => {
        setDateHook(date)
        let yourdate = (new Intl.DateTimeFormat(['ban', 'id']).format(date)).split("/").reverse().join("-");
        nouveauSejourRef.current.dateEntree = yourdate;
        serviceSejourRef.current.dateEntree = yourdate;
    }

    const handleSelectService = (selectedOption) => {
        serviceSejourRef.current.service = "/api/services/" + selectedOption.target.value;
    }


    return (
        <div>
            <p>Aucun séjour en cours</p>
            <p>Merci de remplir les informations</p>
            <form onSubmit={handleSubmit}>
                <label>Date Entrée : </label>
                <DatePicker className="m-3" selected={dateHook} onChange={(date) => formatDate(date)} />
                <div className="row">

                    <label className="m-3" >Lit </label>
                    <select className="m-3 form-selec form-select-sm w-25" name='lits' onChange={(lit) => nouveauSejourRef.current.lit = "/api/lits/" + Number(lit.target.value)}>
                        {litsAvailableRef.current.map((lit) => (
                            < option value={lit.id} key={lit.id}  >
                                {lit.id}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="row">
                    <label className="m-3 max-length">Service </label>
                    {/* <select className="m-3 form-selec form-select-sm w-25" name='service' onChange={(service) => serviceSejourRef.current.service = ('/api/services/' + service.target.value)}>
                        {servicesRef.current.map((service) => (
                            < option value={service.id} key={service.id}  >
                                {service.nom}
                            </option>
                        ))}
                    </select> */}
                    <ServiceSelect 
                    prop={serviceSejourRef}
                    onSelect={handleSelectService}/>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-success">
                        Enregistrer
                    </button>
                </div>
            </form >
        </div>
    )
}
