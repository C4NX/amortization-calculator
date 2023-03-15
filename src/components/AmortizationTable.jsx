import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import amortizationToTable from '../converters/amortizationToTable';

export default function AmortizationTable(props) {
  const { className } = props;
  const [state, setState] = useState({
    montant: 100_000,
    taux: 12,
    duree: 5,
    periodicite: 'annuel',
  });

  const [tableData, setTableData] = useState([]);

  const updateMontant = (e) => {
    setState({
      ...state,
      montant: +e.target.value,
    });
  };

  const updateTaux = (e) => {
    setState({
      ...state,
      taux: +e.target.value,
    });
  };

  const updateDuree = (e) => {
    setState({
      ...state,
      duree: +e.target.value,
    });
  };

  const updatePeriodicite = (e) => {
    setState({
      ...state,
      periodicite: e.target.value,
    });
  };

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('table data needs to be updated', state);
    setTableData(amortizationToTable(state));
  }, [state]);

  window.tableData = tableData;

  return (
    <div className={className}>
      <h5>
        Tableau d'amortissement sur
        {' '}
        <strong>
          {state.duree}
          {' '}
          ans
        </strong>
        {' '}
        au taux de
        {' '}
        <strong>
          {state.taux}
          %
        </strong>
        {' '}
        avec un montant de
        {' '}
        <strong>
          {state.montant}
          €
        </strong>
        {' '}
        et une périodicité
        {' '}
        <strong>{state.periodicite}</strong>
      </h5>
      <form>
        <div className="form-group" style={{ display: 'flex', justifyContent: 'space-around' }}>
          <label htmlFor="emprunt">
            {' '}
            Montant de l’Emprunt
            <input type="number" className="form-control" id="emprunt" value={state.montant} onChange={updateMontant} />
          </label>
          <label htmlFor="taux">
            {' '}
            Taux d'intérêt
            <input type="number" className="form-control" id="taux" value={state.taux} onChange={updateTaux} />
          </label>
          <label htmlFor="duree">
            {' '}
            Durée de l’emprunt (en années)
            <input type="number" className="form-control" id="duree" value={state.duree} onChange={updateDuree} />
          </label>
          <label htmlFor="periodicite">
            {' '}
            Périodicité de remboursement
            <select className="form-control" id="periodicite" onChange={updatePeriodicite}>
              <option value="mensuel">Mensuel</option>
              <option value="trimestriel">Trimestriel</option>
              <option value="semestriel">Semestriel</option>
              <option value="annuel" selected>Annuel</option>
            </select>
          </label>
        </div>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th>Périodes</th>
            <th>Capital restant du en début de période</th>
            <th>Intérêts de la période</th>
            <th>Amortissement du Capital</th>
            <th>Annuité constante (ou mensualité)</th>
            <th>Capital restant du en fin de période</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row) => (
            <tr key={row}>
              {row.map((cell) => (
                <td key={cell}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

AmortizationTable.propsTypes = {
  className: PropTypes.string,
};
AmortizationTable.defaultProps = {
  className: '',
};
