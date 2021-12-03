import axios from 'axios';
import React, { useEffect } from 'react';
import useState from "react-usestateref";
import serverAddress from '../consts/ServerAddress';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


export default function Sejours(props) {
    const [loading, setLoading] = useState(true);
    const [sejours, setSejours, sejoursRef] = useState([]);
    const [lits, setLits, litsRef] = useState([]);
    const [litsAvailable, setLitsAvailable, litsAvailableRef] = useState([]);
    const [nouveauSejour, setNouveauSejour, nouveauSejourRef] = useState({
        "dateEntree": "",
        "dateSortie": "",
        "lit": "",
        "services": []
    });
    const [date, setDate] = useState(new Date());



    //Fake data
    //TODO: recevoir en props le patient
    const [patient, setPatient, patientRef] = useState(
        props.location.aboutProps || JSON.parse(localStorage.getItem('patient'))
    );

    //on test si on reçoit un patient en props, si oui on le sauvegarde
    if (props.location.aboutProps) {
        //on le met en localStorage
        // setPatient(props.location.aboutProps.patient)
        localStorage.setItem(
            'patient',
            JSON.stringify(props.location.aboutProps))
    }

    const [usedLit, setUsedLit, usedLitRef] = useState("");


    const fetchSejours = async () => {
        const data = await axios.get(serverAddress + '/api/sejours')
            .then((response) => response.data["hydra:member"])
        setSejours(data)
    }

    const fetchLits = async () => {
        const data = await axios.get(serverAddress + '/api/lits')
            .then((response) => response.data["hydra:member"])
        setLits(data)
        //on filtre les lits pour ne garder que ceux qui sont disponibles
        LitsAvailable()
    }

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
    //Formatter une date du JSON au format yyyy-MM-dd
    const formatYmd = date => date.slice(0, 10);


    const handleSelect = (selectedOption) => {
        setUsedLit(selectedOption.target.value)
    }

    const setup = () => {
        if (patientRef.current.patient.sejours.length > 0) {
            setUsedLit(patientRef.current.patient.sejours.at(-1).lit.substr(-2));
        }
        setLoading(false)
    }

    const isSejourEnCoursForPatient = () => {
        //on vérifie tous les cas (le patient a t il des séjours
        //si oui sont ils terminés....

        //si il y a des séjours
        if (patientRef.current.patient.sejours.length > 0) {
            //si il y a pas de date de sortie au derrier séjour c'est en cours
            if (patientRef.current.patient.sejours.at(-1).dateSortie == "") {
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

    const handleSelectDateEntreeNouveauSejour = (selectedOption) => {
        nouveauSejourRef.current.dateEntree = selectedOption
    }

    const handleSubmit = async event => {
        event.preventDefault();
    }

    const handleModify = async event => {
        event.preventDefault();
    }

    useEffect(() => {
        fetchSejours()
        fetchLits()
        setup()

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
                        <>
                            <p>Aucun séjour en cours</p>
                            <p>Entrer la date de début</p>
                            <form onSubmit={handleSubmit}>
                                <label>Date Entrée : </label>
                                <DatePicker selected={date} onChange={(date) => setDate(date)} />
                                <label>Lit </label>
                                <select name='lits' onChange={handleSelectDateEntreeNouveauSejour}>
                                    {litsAvailableRef.current.map((lit) => (
                                        < option value={lit.id} key={lit.id}  >
                                            {lit.id}
                                        </option>
                                    ))}
                                </select>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">
                                        Enregistrer
                                    </button>
                                </div>
                            </form >
                        </>
                    )}
                    {/*
            TODO: Faire un genre de ternaire avec :() apres l accolade fermante
            */}
                    {(isSejourEnCoursForPatient() == true) && (
                        <>
                            <p>un séjour est en cours</p>
                            {/* on affiche la date d'entrée préremplie */}
                            <form onSubmit={handleSubmit}>
                                <label>Date Entrée : </label>
                                <input type='date' name='dateEntree' value={formatYmd(patientRef.current.patient.sejours.at(-1).dateEntree)} ></input>
                                <label>Lit </label>
                                <select name='lits' value={usedLitRef.current} onChange={handleSelect}>
                                    {litsAvailableRef.current.map((lit) => (
                                        < option value={lit.id} key={lit.id}  >
                                            {lit.id}
                                        </option>
                                    ))}
                                </select>
                                <div className="form-group">
                                    <button type="submit" className="btn btn-success">
                                        Enregistrer
                                    </button>
                                </div>
                            </form >
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
