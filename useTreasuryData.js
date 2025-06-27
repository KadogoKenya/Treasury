import { useState } from 'react';

const FX_RATES = {
  KES_USD: 0.0075,
  USD_KES: 133.33,
  KES_NGN: 1.12,
  NGN_KES: 0.89,
  USD_NGN: 149.33,
  NGN_USD: 0.0067
};

const initialAccounts = [
  { id: 1, name: 'Mpesa_KES_1', currency: 'KES', balance: 1000000 },
  { id: 2, name: 'Bank_KES_2', currency: 'KES', balance: 2500000 },
  { id: 3, name: 'Wallet_KES_3', currency: 'KES', balance: 500000 },
  { id: 4, name: 'Bank_USD_1', currency: 'USD', balance: 100000 },
  { id: 5, name: 'Wallet_USD_2', currency: 'USD', balance: 50000 },
  { id: 6, name: 'Reserve_USD_3', currency: 'USD', balance: 200000 },
  { id: 7, name: 'Bank_NGN_1', currency: 'NGN', balance: 5000000 },
  { id: 8, name: 'Wallet_NGN_2', currency: 'NGN', balance: 2000000 },
  { id: 9, name: 'Reserve_NGN_3', currency: 'NGN', balance: 10000000 },
  { id: 10, name: 'Settlement_NGN_4', currency: 'NGN', balance: 3000000 }
];

function useTreasuryData() {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [transactions, setTransactions] = useState([]);
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [transferDate, setTransferDate] = useState('');

  const handleTransfer = (e) => {
    e.preventDefault();
    const from = accounts.find(acc => acc.id === parseInt(fromAccount));
    const to = accounts.find(acc => acc.id === parseInt(toAccount));
    const amt = parseFloat(amount);

    if (!from || !to || from.id === to.id || isNaN(amt) || amt <= 0 || from.balance < amt) {
      alert('Invalid transfer');
      return;
    }

    let convertedAmount = amt;
    if (from.currency !== to.currency) {
      const rate = FX_RATES[`${from.currency}_${to.currency}`];
      if (!rate) return alert('No FX rate');
      convertedAmount = amt * rate;
    }

    const newAccounts = accounts.map(acc => {
      if (acc.id === from.id) return { ...acc, balance: acc.balance - amt };
      if (acc.id === to.id) return { ...acc, balance: acc.balance + convertedAmount };
      return acc;
    });

    const txn = {
      id: transactions.length + 1,
      fromAccount: from.name,
      toAccount: to.name,
      fromCurrency: from.currency,
      toCurrency: to.currency,
      amount: amt,
      convertedAmount,
      note,
      date: transferDate || new Date().toISOString().split('T')[0],
      status: 'Completed'
    };

    setAccounts(newAccounts);
    setTransactions([...transactions, txn]);
    setFromAccount('');
    setToAccount('');
    setAmount('');
    setNote('');
    setTransferDate('');
  };

  return {
    accounts,
    transactions,
    fromAccount,
    toAccount,
    amount,
    note,
    transferDate,
    setFromAccount,
    setToAccount,
    setAmount,
    setNote,
    setTransferDate,
    handleTransfer
  };
}

export default useTreasuryData;
