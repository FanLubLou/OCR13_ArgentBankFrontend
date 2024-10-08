import React from 'react';
import "./../../style/main.css";
import ItemHome from '../../components/FeatureItem/FeatureItem';
import iconChat from "./../../assets/img/icon-chat.png";
import iconMoney from "./../../assets/img/icon-money.png";
import iconSecurity from "./../../assets/img/icon-security.png";

/**
 * Composant fonctionnel représentant la page d'accueil.
 * Affiche un héros avec un message promotionnel ainsi qu'une section de fonctionnalités mettant en avant les avantages de la banque.
 * 
 * @component
 * @returns {JSX.Element} Le rendu du composant Home avec le contenu de la page d'accueil.
 */
export default function Home() {
  return (
    <main>
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Promoted Content</h2>
          <p className="subtitle">No fees.</p>
          <p className="subtitle">No minimum deposit.</p>
          <p className="subtitle">High interest rates.</p>
          <p className="text">Open a savings account with Argent Bank today!</p>
        </section>
      </div>
      <section className='features'>
        <ItemHome 
          className="feature-item" 
          image={iconChat} 
          titre='You are our #1 priority' 
          description='Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes.' 
        />
        <ItemHome 
          className="feature-item" 
          image={iconMoney} 
          titre='More savings means higher rates' 
          description='The more you save with us, the higher your interest rate will be!' 
        />
        <ItemHome 
          className="feature-item" 
          image={iconSecurity} 
          titre='Security you can trust' 
          description='We use top of the line encryption to make sure your data and money is always safe.' 
        />
      </section>
    </main>
  )
}
