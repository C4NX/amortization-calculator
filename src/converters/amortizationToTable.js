function round(x) {
  return +x.toFixed(2);
}

export default function amortizationToTable(state) {
  const tableData = [];

  const t = state.taux / 100;
  const anuite = round(state.montant * (t / (1 - (1 + t) ** -state.duree)));

  // TODO: add taux mensuel

  for (let i = 1; i <= state.duree; i += 1) {
    if (i === 1) {
      const interest = round(state.montant * t);
      const amortissement = round(anuite - interest);
      tableData.push([i, state.montant, interest, amortissement, anuite, round(state.montant - amortissement)]);
    } else {
      const montant = tableData[tableData.length - 1][5];
      const interest = round(montant * t);
      const amortissement = round(anuite - interest);
      tableData.push([i, interest, interest, amortissement, anuite, round(montant - amortissement)]);
    }
  }

  tableData.push(['Total']);

  console.log('updated tableData: ', tableData);

  return tableData;
}
