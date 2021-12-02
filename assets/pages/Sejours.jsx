import axios from 'axios';
import React, { useEffect } from 'react';
import useState from "react-usestateref";

export default function Sejours() {
    const [sejours, setSejours, sejoursRef] = useState([]);
    const [lits, setLits, litsRef] = useState([]);
    const [litsAvailable, setLitsAvailable, litsAvailableRef] = useState([]);

    const fetchSejours = async () => {
        const data = await axios.get('http://127.0.0.1:8000/api/sejours')
            .then((response) => response.data["hydra:member"])
        setSejours(data)
        console.log('sejours: ')
        console.log(sejoursRef.current)
    }

    const fetchLits = async () => {
        const data = await axios.get('http://127.0.0.1:8000/api/lits')
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

    useEffect(() => {
        fetchSejours()
        fetchLits()
    }, []);
    return (
        <>
            <div>
                <p>Patient : ID NOM PRENOM</p>
            </div>
            {/* si un séjour existe déja on le met //On verra plus tard */}
            <form>
                <label>Date Entrée : </label>
                <input type='date' name='dateEntree'></input>
                <label>Lit </label>
                <select name='lits'>
                    {litsAvailableRef.current.map((lit) => (
                        < option value="lit" key={lit.id} >
                            {lit.id}
                        </option>
                    ))}
                </select>
            </form >

        </>
    )
}
