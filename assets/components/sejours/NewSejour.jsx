import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function NewSejour({ nouveauSejourRef, litsAvailableRef, }) {

    //date au format du DatePicker pour l'afficher
    const [dateHook, setDateHook] = useState(new Date());

    //envoie du formulaire
    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/sejours", nouveauSejourRef.current);
        } catch (error) {
            console.log(error.response);
        }
    }

    const debug = () => {
        console.log(nouveauSejourRef.current)
        // const dateFormat = Date.parse(nouveauSejourRef.current.dateEntree)
        // console.log(dateFormat)
        // console.log(new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(nouveauSejourRef.current.dateEntree));
    }

    const formatDate = (date) => {
        setDateHook(date)
        console.log('formatdaet')
        const dateFormat = Date.parse(date)
        console.log(dateFormat)
        var yourdate = (new Intl.DateTimeFormat(['ban', 'id']).format(date)).split("/").reverse().join("-");
        // console.log(new Intl.DateTimeFormat('fr-FR', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(nouveauSejourRef.current.dateEntree));
        nouveauSejourRef.current.dateEntree = yourdate;
      }
    

    return (
        <div>
            <p>Aucun séjour en cours</p>
            <p>Merci de remplir les informations</p>
            <form onSubmit={handleSubmit}>
                <label>Date Entrée : </label>
                <DatePicker selected={dateHook} onChange={(date) => formatDate(date)} />
                <label>Lit </label>
                <select name='lits' onChange={(lit) => nouveauSejourRef.current.lit = "/api/lits/" + Number(lit.target.value)}>
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
            <span className="btn" onClick={debug}>debug</span>
        </div>
    )
}
