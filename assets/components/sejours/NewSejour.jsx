import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default function NewSejour({ handleSubmit, date, handleSelectDateEntreeNouveauSejour, litsAvailableRef, setDate }) {
    return (
        <div>
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
        </div>
    )
}
