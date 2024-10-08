import React from 'react'
/**
 * Composant représentant une section de compte avec titre, montant et description.
 *
 * @component
 * @param {Object} props - Propriétés du composant.
 * @param {string} props.title - Le titre du compte (par exemple, "Checking", "Savings").
 * @param {string} props.amount - Le montant du compte.
 * @param {string} props.description - La description du montant (par exemple, "Current Balance").
 * @returns {JSX.Element} Une section affichant les informations du compte avec un bouton pour voir les transactions.
 */
export default function Account({title, amount, description}) {
  return (
    <section className="account">
        <div className="account-content-wrapper">
              <h3 className="account-title">{title}</h3>
              <p className="account-amount">{amount}</p>
              <p className="account-amount-description">{description}</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
  )
}
