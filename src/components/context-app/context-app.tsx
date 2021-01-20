import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { Selector } from 'reselect';

interface ContextAppModel {
  state: State;
  setAuth?: (payload: any) => void;
  setAccounts?: (payload: any) => void;
  setTransactions?: (payload: any) => void;
  setPending?: () => void;
};

interface StateData {
  auth?: any;
  accounts?: any;
  transactions?: any;
};

interface ContextProviderProps {
  children: ReactNode,
}
const initData = { state: { isLoading: false } };
const ContextApp = createContext<ContextAppModel>(initData);

enum FinappActions {
  SET_AUTH = "SET_AUTH",
  SET_ACCOUNTS = "SET_ACCOUNTS",
  SET_TRANSACTIONS = "SET_TRANSACTIONS",
  SET_PENDING = "SET_PENDING",
};

type State = {
  data?: StateData;
  isLoading: boolean;
  error?: string;
}
type Action =
  | { type: FinappActions, payload?: any, error?: string }

const modifier = {
  [FinappActions.SET_AUTH]: (state: State, payload: any): State => ({ ...state, data: { ...state.data, auth: payload } }),
  [FinappActions.SET_ACCOUNTS]: (state: State, payload: any): State => ({ ...state, data: { ...state.data, accounts: payload } }),
  [FinappActions.SET_TRANSACTIONS]: (state: State, payload: any): State => ({ ...state, data: { ...state.data, transactions: payload } }),
  [FinappActions.SET_PENDING]: (state: State, payload: any): State => ({ ...state, isLoading: false })
};

type FinappReducer = (state: State, action: Action) => State;

const finappReducer: FinappReducer = (state, action) => {
  return modifier[action.type](state, action.payload);
}

export const ContextProvider = (props: ContextProviderProps) => {
  let [state, dispatch] = useReducer(finappReducer, initData.state);
  const contextValue = {
    state,
    setPending: () => dispatch({ type: FinappActions.SET_PENDING }),
    setAuth: (payload: any) => dispatch({ type: FinappActions.SET_AUTH, payload }),
    setAccounts: (payload: any) => dispatch({ type: FinappActions.SET_ACCOUNTS, payload }),
    setTransactions: (payload: any) => dispatch({ type: FinappActions.SET_TRANSACTIONS, payload })
  };
  return <ContextApp.Provider {...props} value={contextValue} />
}

export const useFinAppCtx = () => {
  let { state, ...context } = useContext(ContextApp);
  return context;
}

type Reselector<T> = Selector<State, T>;
type UseSelector = <T>(selector: Reselector<T>) => T;

export const useSelector: UseSelector = (selector) => {
  let context = useContext(ContextApp);
  return selector(context.state);
}
