import axios from 'axios';
import React, { useEffect } from 'react';
import useState from "react-usestateref";

export default function Sejours() {
    const [sejours, setSejours, sejoursRef] = useState([]);
    const [lits, setLits, litsRef] = useState([]);

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
    }

    const isLitAvailable = () => {
        
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
                    {litsRef.current.map((lit) => (
                        < option value="test" key={lit.id} >
                            {lit.id}
                        </option>
                    ))}
                </select>
            </form >

        </>
    )
}
