import { AccountResponse } from '../entities/entities';

type ClientCallback<T> = (error: Object | null, response: T | null) => void;

export default function Client() {
  const HOST = 'http://localhost:8080/api';
  const GET_ACCOUNTS_PATH = '/accounts/';
  const GET_TRANSACTIONS_PATH = '/transactions/';

  const getAccounts: (callback: ClientCallback<AccountResponse[]> ) => void = (callback) => {
    fetch(`${HOST}${GET_ACCOUNTS_PATH}`)
      .then(resp => resp.json())
      .then(respJson => callback(null, respJson))
      .catch(err => callback(err, null))
  }

  const getTransactions: (accountId: number, callback: ClientCallback<Object>) => void = (accountId, callback) => {
    fetch(`${HOST}${GET_TRANSACTIONS_PATH}`)
      .then(resp => resp.json())
      .then(respJson => callback(null, respJson))
      .catch(err => callback(err, null))
  }

  return { getAccounts, getTransactions };
}
