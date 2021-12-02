import axios from 'axios';
import React, { useEffect } from 'react';
import useState from "react-usestateref";
import serverAddress from '../consts/ServerAddress';

export default function Sejours() {
    const [sejours, setSejours, sejoursRef] = useState([]);
    const [lits, setLits, litsRef] = useState([]);
    const [litsAvailable, setLitsAvailable, litsAvailableRef] = useState([]);

    //Fake data
    //TODO: recevoir en props le patient
    const [patient, setPatient, patientRef] = useState({
        "id": 62,
        "prenom": "Maurice",
        "nom": "Vaillant",
        "age": 29,
        "sejours": [
            {
                "@id": "/api/sejours/149",
                "@type": "Sejour",
                "id": 149,
                "dateEntree": "2019-12-27T21:04:43+00:00",
                "dateSortie": "2021-02-13T14:42:36+00:00",
                "lit": "/api/lits/73",
                "services": []
            },
            {
                "@id": "/api/sejours/150",
                "@type": "Sejour",
                "id": 150,
                "dateEntree": "2020-07-03T19:19:44+00:00",
                "dateSortie": "2020-12-05T12:10:03+00:00",
                "lit": "/api/lits/65",
                "services": []
            },
            {
                "@id": "/api/sejours/151",
                "@type": "Sejour",
                "id": 151,
                "dateEntree": "2019-11-23T13:37:41+00:00",
                "dateSortie": "2022-11-23T13:37:41+00:00",
                "lit": "/api/lits/67",
                "services": [
                    "/api/service_sejours/3",
                    "/api/service_sejours/41"
                ]
            }
        ]
    });
    const [usedLit, setUsedLit, usedLitRef] = useState("");


    const fetchSejours = async () => {
        const data = await axios.get(serverAddress + '/api/sejours')
            .then((response) => response.data["hydra:member"])
        setSejours(data)
        console.log('sejours: ')
        console.log(sejoursRef.current)
    }

    const fetchLits = async () => {
        const data = await axios.get(serverAddress + '/api/lits')
            .then((response) => response.data["hydra:member"])
        setLits(data)
        console.log('lits: ')
        console.log(litsRef.current)
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
        console.log(selectedOption.target.value)
        setUsedLit(selectedOption.target.value)
    }

    const setup = () => {
        if (patientRef.current.sejours.length > 0) {
            console.log("on a des séjours")
            setUsedLit(patientRef.current.sejours.at(-1).lit.substr(-2));
        }
    }

    const isSejourEnCours = () => {
        //on doit vérifier tous les cas (le patient a t il des séjours
        //si oui sont ils terminés....

        return true
    }

    useEffect(() => {
        fetchSejours()
        fetchLits()
        setup()

    }, []);
    return (
        <>
            <div>
                <p>Patient : {patientRef.current.id} {patientRef.current.prenom} {patientRef.current.nom.toUpperCase()}</p>
            </div>
            {/*
            Si un séjour est en cours:
            On l'écrit
            1 on met la date d entrée à jour
            2 on met le lit a jour
            */}

            {(patientRef.current.sejours.length == 0 || Date.parse(patientRef.current.sejours.at(-1).dateSortie) < Date.now()) && (
                <>
                    <p>Aucun séjour en cours</p>
                </>
            )}
            {/* Erreur ici si le patient n'a pas de séjours
            TODO: remplacer la condition par la fonction 'isSejourEnCours' qui return un bool true ou false et gère tous les cas
            */}
            {(Date.parse(patientRef.current.sejours.at(-1).dateSortie) > Date.now() || patientRef.current.sejours.at(-1).dateSortie == "") && (
                <>
                    <p>un séjour est en cours</p>
                    {/* on affiche la date d'entrée préremplie */}
                    <form>
                        <label>Date Entrée : </label>
                        <input type='date' name='dateEntree' value={formatYmd(patientRef.current.sejours.at(-1).dateEntree)} ></input>
                        <label>Lit </label>
                        <select name='lits' value={usedLitRef.current} onChange={handleSelect}>
                            {litsAvailableRef.current.map((lit) => (
                                < option value={lit.id} key={lit.id}  >
                                    {lit.id}
                                </option>
                            ))}
                        </select>
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
    )
}
