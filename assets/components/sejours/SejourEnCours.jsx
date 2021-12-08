import axios from 'axios';
import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import useState from 'react-usestateref';
import serverAddress from '../../consts/ServerAddress';
import ServiceSelect from '../ServicesSelect';


export default function SejourEnCours({ litsAvailableRef, formatYmd, patientRef, usedLitRef, handleSelect }) {
    const [dateHook, setDateHook] = useState(null);
    const [dateDebutHook, setDateDebutHook] = useState(new Date());
    const [sejoursSaufDernier, setSejoursSaufDernier, sejoursSaufDernierRef] = useState(JSON.parse(JSON.stringify(patientRef.current.patient.sejours)));
    const [serviceSejourSaufDernier, setServiceSejourSaufDernier, serviceSejourSaufDernierRef] = useState(JSON.parse(JSON.stringify(patientRef.current.patient.sejours.at(-1).services)));
    const [changerServiceBool, setchangerServiceBool] = useState(false);
    const [serviceSejour, setServiceSejour, serviceSejourRef] = useState({
        "dateEntree": new Date(),
        "sejour": "",
        "service": ""
    })
    const [requestConfig, setRequestConfig] = useState({
        headers: { "Content-Type": "application/merge-patch+json" },
    });
    const [nouveauServiceSejour, setnouveauServiceSejour, nouveauServiceSejourRef] = useState({
        "dateEntree": new Date(),
        "sejour": patientRef.current.patient.sejours.at(-1).id,
        "service": ""
    });
    const formatDate = (date) => {
        setDateHook(date)
        let yourdate = (new Intl.DateTimeFormat(['ban', 'id']).format(date)).split("/").reverse().join("-");
    }

    const debug = () => {
        console.log(serviceSejourSaufDernier)
        console.log(patientRef.current.patient.sejours.at(-1).services.at(-1).service)
        console.log(changerServiceBool)
    }

    const setup = () => {
        sejoursSaufDernier.pop()
        serviceSejourSaufDernier.pop()
    }

    const cloreSejour = async () => {
        console.log('je clore le séjour')
        try {
            const response = await axios.patch(serverAddress + "/api/sejours/" + patientRef.current.patient.sejours.at(-1).id, {
                "dateSortie": new Date()
            }, requestConfig);
            console.log(response)
        } catch (error) {
            console.log(error.response.data);
        }

    }

    const changerService = () => {
        console.log('je change le service')
        setchangerServiceBool(!changerServiceBool)

    }

    const posterService = async () => {
        //on patch le service sejour pour rajouter dateSortie a date now
        console.log('je tente de poster le service')
        try {
            const response = await axios.patch(serverAddress + "/api/service_sejours/" + patientRef.current.patient.sejours.at(-1).services.at(-1).id, {
                "dateSortie": new Date()
            }, requestConfig);
            console.log(response)
        } catch (error) {
            console.log(error.response.data);
        }
        // console.log(patientRef.current.patient.sejours.at(-1).services.at(-1).id)
        //on post un new serviceSejour avec la service et la date entree a mtn
        try {
            const response = await axios.post(serverAddress + "/api/service_sejours", {
                "dateEntree": new Date(),
                "sejour": "/api/sejours/" + patientRef.current.patient.sejours.at(-1).id,
                "service": "/api/services/" + nouveauServiceSejourRef.current.service
            });
            console.log(response)
        } catch (error) {
            console.log(error.response.data);
        }
    }

    const handleSelectNouveauService = (selectedOption) => {
        nouveauServiceSejourRef.current.service = selectedOption.target.value
        console.log(nouveauServiceSejourRef.current.service)
    }

    useEffect(() => {
        setup();
    }, [])
    return (
        <div>
            {/* de ICI CEST LE SEJOUR */}
            <p>sejour n° {patientRef.current.patient.sejours.at(-1).id} en cours</p>
            <form>
                <div className="container">
                    <div>
                        <p>Date Entrée : {formatYmd(patientRef.current.patient.sejours.at(-1).dateEntree)} </p>
                    </div>
                    <label>Lit </label>
                    <select name='lits' value={usedLitRef.current} onChange={handleSelect}>
                        {litsAvailableRef.current.map((lit) => (
                            < option value={lit.id} key={lit.id}  >
                                {lit.id}
                            </option>
                        ))}
                    </select>

                    {/* A ICI */}
                    {/* LA ON SOCCUPE DU SERVICE EN COURS (a refactoriser en componenent) */}
                    {/* <div>blabla la on demande si il faut changer de service etc</div> */}
                    <div>
                        Service en cours : {patientRef.current.patient.sejours.at(-1).services.at(-1).service.nom}
                    </div>
                    <div>
                        Date entrée service : {formatYmd(patientRef.current.patient.sejours.at(-1).services.at(-1).dateEntree)}
                    </div>
                    <span className="btn" onClick={() => cloreSejour()}>Clore le séjour</span>
                    <span className="btn" onClick={() => changerService()}>Changer de service</span>
                    {/* 2 boutons => changer de service / clore le séjour  */}
                    {/* Si clore le séjour => on met fin au service (dateSortie = now) + fin au séjour*/}
                    {/* Si changer de service => on propose les champs d'ajout du nouveau service et lors de l'ajout on met fin au service précédent */}
                    {(changerServiceBool == true) && (
                        <div>
                            {/* ici on met un select avec les services et un bouton de validation */}
                            <ServiceSelect prop={nouveauServiceSejourRef} onSelect={handleSelectNouveauService} />
                            <span className="btn" onClick={() => posterService()}>Faire le changement</span>

                        </div>
                    )}

                    {/* ICI ON S OCCUPE DE L HISTORIQUE DES SERVICES */}
                    <div className="m-5">
                        <p className="mt-2">Historique des services</p>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Identifiant</th>
                                    <th>Date entrée</th>
                                    <th>Date sortie</th>
                                    <th>Service</th>

                                </tr>
                            </thead>
                            <tbody>

                                {serviceSejourSaufDernierRef.current.map((serviceSejour) => (
                                    <tr key={serviceSejour.id}>
                                        <td>{serviceSejour.id}</td>
                                        <td>{formatYmd(serviceSejour.dateEntree)}</td>
                                        <td>{formatYmd(serviceSejour.dateSortie)}</td>
                                        <td>{serviceSejour.service.nom}</td>

                                    </tr>
                                ))}
                                <tr>

                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>



                        </table>
                    </div>

                    <div className="form-group">
                        <button type="submit" className="btn btn-success">
                            Enregistrer
                        </button>
                    </div>
                </div>
                <p className="mt-4">Séjours passés</p>

                {/* dans le tableau on met tous les séjours passés (dateSortie not null && dateSortie < Date.now) */}
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Identifiant</th>
                            <th>Date entrée</th>
                            <th>Date sortie</th>

                        </tr>
                    </thead>
                    <tbody>
                        {sejoursSaufDernier.map((sejour) => (
                            <tr key={sejour.id}>
                                <td>{sejour.id}</td>
                                <td>{formatYmd(sejour.dateEntree)}</td>
                                <td>{formatYmd(sejour.dateSortie)}</td>
                            </tr>
                        ))}
                    </tbody>

                    <div className="m-3">
                        sejour
                        {/* 
                            TODO:::: boucler sur les services du denrier séjour 
                            // il faut reconfigurer l api pour avoir + d'infos sur les services 
                            //les services terminés on ne peut pas les modifier par contre le dernier service il faut pourvoir le clore
                            //si on clot le dernier service il faut pouvoir en affecter uun nouveau
                            */}
                    </div>

                </table>
            </form >

        </div >
    )
}
