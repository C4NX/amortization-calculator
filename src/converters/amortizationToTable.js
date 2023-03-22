export default function amortizationToTable(state) {
  const tableData = [];

  const t = state.taux / 100;
  const anuite = state.montant * (t / (1 - (1 + t) ** -state.duree));

  // TODO: add taux mensuel

  for (let i = 1; i <= state.duree; i += 1) {
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
      console.log(tableData[i][j]);
      tableData[i][j] = Math.round(tableData[i][j] * 100) / 100;
    }
  }
  tableData.push(['Total']);

  console.log('updated tableData: ', tableData);

  return tableData;
}
