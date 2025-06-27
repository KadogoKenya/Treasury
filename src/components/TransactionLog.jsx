import React from 'react';
import './TransactionLog.css';

function TransactionLog({ transactions }) {
  return (
    <section className="transaction-log">
      <h2>Transaction Log</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Converted</th>
            <th>Note</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 ? (
            <tr><td colSpan="7">No transactions found</td></tr>
          ) : (
            transactions.map(txn => (
              <tr key={txn.id}>
                <td>{txn.date}</td>
                <td>{txn.fromAccount}</td>
                <td>{txn.toAccount}</td>
                <td>{txn.amount}</td>
                <td>{txn.convertedAmount}</td>
                <td>{txn.note || '-'}</td>
                <td className={`status-${txn.status.toLowerCase()}`}>{txn.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </section>
  );
}

export default TransactionLog;