export default function amortizationToTable(state) {
  const tableData = [];
  // eslint-disable-next-line no-nested-ternary
  const periode = state.periodicite === 'mensuel' ? 12 : state.periodicite === 'trimestriel' ? 4 : state.periodicite === 'semestriel' ? 2 : 1;
  const t = (state.periodicite === 'annuel' ? state.taux / 100 : ((1 + state.taux / 100) ** (1 / periode) - 1));
  const dureePeriode = state.duree * periode;
  const anuite = state.montant * (t / (1 - (1 + t) ** -dureePeriode));

  for (let i = 1; i <= dureePeriode; i += 1) {
    if (i === 1) {
      const interest = state.montant * t;
      const amortissement = anuite - interest;
      tableData.push([i, state.montant, interest, amortissement, anuite, state.montant - amortissement]);
    } else {
      const montant = tableData[tableData.length - 1][5];
      const interest = montant * t;
      const amortissement = anuite - interest;
      tableData.push([i, interest, interest, amortissement, anuite, montant - amortissement]);
    }
  }
  for (let i = 0; i < tableData.length; i += 1) {
    for (let j = 1; j < tableData[i].length; j += 1) {
      tableData[i][j] = Math.round(tableData[i][j] * 100) / 100;
    }
  }
  tableData.push(['Total']);

  return tableData;
}
