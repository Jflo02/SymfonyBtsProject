import React from 'react'

export default function SejourEnCours({ handleSubmit, litsAvailableRef, formatYmd, patientRef, usedLitRef, handleSelect }) {
    return (
        <div>
            <p>sejour en cours</p>
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
        </div>
    )
}
