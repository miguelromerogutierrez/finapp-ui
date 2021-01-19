import React from 'react'
import { useParams } from 'react-router-dom';

import Donut from '../donut';

export default function Account() {
  let params = useParams<{id:string}>();
  console.log(params)
  const data = [
    { id:1, amount: '$12,000.00', amountRaw: 12000.00, alias: 'Main Acct.', bankName: 'BBVA', type: 'Debit' },
  ];
  const totalPortfolio = 12000;
  const donutDataset = data.reduce((dataset: {labels: string[], data: number[]}, acct) => {
    return {
      labels: [...dataset.labels, acct.alias],
      data: [...dataset.data, Math.round((acct.amountRaw/totalPortfolio)*100)]
    }
  }, { labels: [], data: [] });
  return (
  <div>
    <h1>{data[0].alias}</h1>
    <Donut dataset={donutDataset} mainValue="$12,000.00" />
    <div>
      <h2>Transactions</h2>
    </div>
  </div>
  )
}
