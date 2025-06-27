import React from 'react';
import './TransferForm.css';

function TransferForm({ accounts, handleTransfer, fromAccount, toAccount, amount, note, transferDate, setFromAccount, setToAccount, setAmount, setNote, setTransferDate }) {
  return (
    <section className="transfer-form">
      <h2 className='transfer-form-title'>Transfer Funds</h2>
      <form onSubmit={handleTransfer}>
        <label className='form-title'>From Account:
          <select value={fromAccount} onChange={e => setFromAccount(e.target.value)} required>
            <option value="">Select</option>
            {accounts.map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name} ({acc.currency} {acc.balance.toLocaleString()})</option>
            ))}
          </select>
        </label>

        <label className='form-title'>To Account:
          <select value={toAccount} onChange={e => setToAccount(e.target.value)} required>
            <option value="">Select</option>
            {accounts.filter(acc => acc.id.toString() !== fromAccount).map(acc => (
              <option key={acc.id} value={acc.id}>{acc.name} ({acc.currency} {acc.balance.toLocaleString()})</option>
            ))}
          </select>
        </label>

        <label className='form-title'>Amount:
          <input type="number" value={amount} onChange={e => setAmount(e.target.value)} required />
        </label>

        <label className='form-title'>Note:
          <input type="text" value={note} onChange={e => setNote(e.target.value)} />
        </label>

        <label className='form-title'>Date:
          <input type="date" value={transferDate} onChange={e => setTransferDate(e.target.value)} />
        </label>

        <button className="transfer-button" type="submit">Transfer</button>
      </form>
    </section>
  );
}

export default TransferForm;