import axios from 'axios';
import React, { useEffect } from 'react';
import useState from "react-usestateref";
import serverAddress from '../consts/ServerAddress';
import "react-datepicker/dist/react-datepicker.css";
import SejourEnCours from '../components/sejours/SejourEnCours';
import NewSejour from '../components/sejours/NewSejour';

export default function Sejours(props) {
    const [loading, setLoading] = useState(true);
    const [sejours, setSejours, sejoursRef] = useState([]);
    const [lits, setLits, litsRef] = useState([]);
    const [litsAvailable, setLitsAvailable, litsAvailableRef] = useState([]);
    const [services, setServices, servicesRef] = useState([]);

    const [usedLit, setUsedLit, usedLitRef] = useState("");

    //patient reçu en props ou a défaut du localStorage
    const [patient, setPatient, patientRef] = useState(
        props.location.aboutProps || JSON.parse(localStorage.getItem('patient'))
    );

    const [nouveauSejour, setNouveauSejour, nouveauSejourRef] = useState({
        "dateEntree": new Date(),
        "dateSortie": null,
        "patient": "/api/patients/" + patientRef.current.patient.id,
        "lit": "",
        "services": []
    });

    //on test si on reçoit un patient en props, si oui on le sauvegarde
    const isPatientInProps = () => {
        if (props.location.aboutProps) {
            //on le met en localStorage
            localStorage.setItem(
                'patient',
                JSON.stringify(props.location.aboutProps))
        }
    }

    //Requete api pour récupérer tous les séjours
    const fetchSejours = async () => {
        const data = await axios.get(serverAddress + '/api/sejours')
            .then((response) => response.data["hydra:member"])
        setSejours(data)
    }

    //Requete api pour récupérer tous les séjours
    const fetchLits = async () => {
        const data = await axios.get(serverAddress + '/api/lits')
            .then((response) => response.data["hydra:member"])
        setLits(data)
        //on filtre les lits pour ne garder que ceux qui sont disponibles
        LitsAvailable()
    }

    //Trie des lits pour ne garder que ceux qui ne sont pas affécté
    const LitsAvailable = () => {
        litsRef.current.forEach(lit => {
            if (lit.sejours.length > 0) {
                //TODO implémenter si la dateSortie est nulle
                const dateSortieDernierSejour = Date.parse(lit.sejours.at(-1).dateSortie);
                //si le dernier sejour du lit a une date passé alors il est disponible
                if (!(dateSortieDernierSejour > Date.now())) {
                    setLitsAvailable([...litsAvailableRef.current, lit])
                }
                //si le lit n'a jamais été affecté à un séjour, il est disponible
            } else {
                setLitsAvailable([...litsAvailableRef.current, lit])
            }

        });
    }

    //Formater une date du JSON au format yyyy-MM-dd
    const formatYmd = (date) => {
        try {
            return date.slice(0, 10);
        } catch(error) {
            return date;
        }
    }

    //Sauvegarde de la selection d'un lit
    const handleSelect = (selectedOption) => {
        setUsedLit(selectedOption.target.value)
    }

    //Données à mettre en place au chargement de la page
    const setup = () => {
        //si le Patient possède au moins un séjour, on prérempli la séléction du lit
        if (patientRef.current.patient.sejours.length > 0) {
            setUsedLit(patientRef.current.patient.sejours.at(-1).lit.substr(-2));
        }
        setLoading(false)
    }

    //Renvoie un booléen
    //Check si le patient a un séjour en cours
    const isSejourEnCoursForPatient = () => {
        //on vérifie tous les cas (le patient a t il des séjours
        //si oui sont ils terminés....
        //si il y a des séjours
        if (patientRef.current.patient.sejours.length > 0) {
            //si il y a pas de date de sortie au derrier séjour c'est en cours
            if (patientRef.current.patient.sejours.at(-1).dateSortie == "" || typeof (patientRef.current.patient.sejours.at(-1).dateSortie) == null) {
                return true;
            }
            else if (!("dateSortie" in patientRef.current.patient.sejours.at(-1))) {
                return true;
            }
            else {
                //sinon si elle est dans le futur c'est en cours
                if ((Date.parse(patientRef.current.patient.sejours.at(-1).dateSortie) > Date.now())) {
                    return true
                }
            }
        }
        return false;
    }

    //???
    const handleModify = async event => {
        event.preventDefault();
    }

    const findServices = async () => {
        const data = axios
            .get(serverAddress + "/api/services")
            .then((response) => setServices(response.data["hydra:member"]));
        // setServices(data);
    }

    const debugSejour = async () => {
        console.log(patientRef.current.patient);
        console.log(isSejourEnCoursForPatient())
    }

    //lancement de fonctions importantes au lancement de la page
    useEffect(() => {
        fetchSejours()
        fetchLits()
        setup()
        isPatientInProps()
        findServices()

    }, []);
    return (
        <>
            {!loading && (
                <>

                    <div>
                        <p>Patient : {patientRef.current.patient.id} {patientRef.current.patient.prenom} {patientRef.current.patient.nom.toUpperCase()}</p>
                    </div>
                    {/*
            Si un séjour est en cours:
            On l'écrit
            1 on met la date d entrée à jour
            2 on met le lit a jour
            */}

                    {(isSejourEnCoursForPatient() == false) && (
                        <NewSejour
                            nouveauSejourRef={nouveauSejourRef}
                            litsAvailableRef={litsAvailableRef}
                            servicesRef={servicesRef}
                        />
                    )}
                    {/*
            TODO: Faire un genre de ternaire avec :() apres l accolade fermante
            */}
                    {(isSejourEnCoursForPatient() == true) && (
                        <>
                            <SejourEnCours
                                // handleSubmit={handleSubmit}
                                // handleSelectDateEntreeNouveauSejour={handleSelectDateEntreeNouveauSejour}
                                litsAvailableRef={litsAvailableRef}
                                formatYmd={formatYmd}
                                patientRef={patientRef}
                                usedLitRef={usedLitRef}
                                handleSelect={handleSelect}
                            />

                        </>
                    )}

                    {/* 
            Si il n'y a pas de séjour en cours
            On l'écrit
            1 on propose d'ajouter un séjours
            Donc date de début et lit
            */}

                </>
            )}
            {loading && <p>chargement</p>}
        </>
    )
}
