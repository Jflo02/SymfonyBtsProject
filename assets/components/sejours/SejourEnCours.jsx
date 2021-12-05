import React, { useEffect } from 'react'
import DatePicker from 'react-datepicker'
import useState from 'react-usestateref';


export default function SejourEnCours({ handleSubmit, litsAvailableRef, formatYmd, patientRef, usedLitRef, handleSelect }) {
    const [dateHook, setDateHook] = useState(new Date());
    const [dateDebutHook, setDateDebutHook] = useState(new Date());
    const [sejoursSaufDernier, setSejoursSaufDernier, sejoursSaufDernierRef] = useState(JSON.parse(JSON.stringify(patientRef.current.patient.sejours)));


    const formatDate = (date) => {
        setDateHook(date)
        let yourdate = (new Intl.DateTimeFormat(['ban', 'id']).format(date)).split("/").reverse().join("-");
    }

    const debug = () => {
        console.log(patientRef.current.patient)
        console.log(sejoursSaufDernier)
    }

    const setup = () => {
        const poped = sejoursSaufDernier.pop()
        console.log(poped)
    }
    useEffect(() => {
        setup();
    }, [])
    return (
        <div>
            <p>sejour en cours</p>
            <form onSubmit={handleSubmit}>
                <div className="row">

                    <label>Date Entrée : </label>
                    <input type='date' name='dateEntree' value={formatYmd(patientRef.current.patient.sejours.at(-1).dateEntree)} ></input>
                </div>

                <div className="row mt-3">
                    <label>Date Sortie : </label>
                    <DatePicker className="m-3" selected={dateHook} onChange={(date) => formatDate(date)} />
                </div>
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
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Identifiant</th>
                            <th>Date entrée</th>
                            <th>Date sortie</th>
                            <th>Services</th>
                            <th>Prise en charge</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sejoursSaufDernier.map((sejour) => (
                            <tr key={sejour.id}>
                                <td>{sejour.id}</td>
                                <td>{sejour.dateEntree}</td>
                                <td>{sejour.dateSortie}</td>
                                <td>{sejour.services.map((service) => {
                                    <div>
                                        <p>{service}</p>
                                        {console.log(service)}
                                    </div>
                                })}</td>
                                <td>
                                    lala
                                </td>

                                <td>
                                    lala

                                </td>
                                <td></td>
                                <td></td>
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
            <span className="btn" onClick={debug}>debug</span>

        </div>
    )
}
