import React from 'react';
import './index.css'
import './App.css'
import useTreasuryData from '../useTreasuryData';
import Accounts from './components/Accounts';
import TransferForm from './components/TransferForm';
import TransactionLog from './components/TransactionLog';

function App() {
  const treasury = useTreasuryData();

  return (
    <div className="app">
      <h1>Treasury Simulator</h1>
      <Accounts accounts={treasury.accounts} />
      <TransferForm {...treasury} />
      <TransactionLog {...treasury} />
    </div>
  );
}

export default App;
