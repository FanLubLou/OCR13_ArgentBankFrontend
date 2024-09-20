import React from 'react';
import Account from '../../components/Account/Account';
import accountsData from './../../data/accountsData.json';

export default function User() {
  return (
    <main class="main bg-dark">
      <div class="header">
        <h1>Welcome back<br />Tony Jarvis!</h1>
        <button class="edit-button">Edit Name</button>
      </div>
      <h2 class="sr-only">Accounts</h2>
      <div>
        {accountsData.map((account, index) => (
          <Account
            key={index}
            title={account.title}
            amount={account.amount}
            description={account.description}
          />
        ))}
    </div>
    </main>
  )
}
