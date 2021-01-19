import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container'

import AccountCard from '../account-card';
import Donut from '../donut';
import Client from '../../api/api';
import { useHistory } from 'react-router-dom';
import { AccountResponse } from '../../entities/entities';

const client = Client();

export default function Dashboard() {
  let history = useHistory();
  let [data, setData] = useState<AccountResponse[]>([]);

  useEffect(() => {
    client.getAccounts((err, resp) => {
      console.log(resp)
      if (resp && !err) {
        return setData(resp);
      }
      setData([])
    });
  }, []);

  const totalPortfolio = 15320;
  const donutDataset = data.reduce((dataset: {labels: string[], data: number[], totalAmount: number}, acct) => {
    return {
      labels: [...dataset.labels, acct.alias],
      data: [...dataset.data, Math.round((acct.amountRaw/totalPortfolio)*100)],
      totalAmount: dataset.totalAmount + acct.amountRaw
    }
  }, { labels: [], data: [], totalAmount: 0 });

  let handleClick = (item:any) => {
    history.push(`/account/${item.id}`);
  }

  return (
    <Container>
      <Donut dataset={donutDataset} mainValue="$15,320.00" />
      {data.map(el => <AccountCard {...el} onClick={handleClick} />)}
    </Container>
  )
}