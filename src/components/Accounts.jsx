import React from 'react';
import './Accounts.css';

function Accounts({ accounts }) {
  return (
    <section>
      <h2 className='accounts-title'>Accounts</h2>
      <div className="accounts-grid">
        {accounts.map(account => (
          <div key={account.id} className="account-card">
            <h3>{account.name}</h3>
            <p>Currency: {account.currency}</p>
            <p>Balance: {account.currency} {account.balance.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Accounts;