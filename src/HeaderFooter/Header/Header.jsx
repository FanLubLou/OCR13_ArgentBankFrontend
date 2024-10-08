import React from 'react';
import logoArgentBank from "./../../assets/img/argentBankLogo.png";
import { NavLink } from "react-router-dom";
import { logout } from '../../features/auth/authSlice';  
import { useSelector, useDispatch } from 'react-redux';
import { resetProfile } from '../../features/profile/profileSlice';

/**
 * Composant fonctionnel représentant l'en-tête de l'application avec une navigation.
 * Affiche soit les liens pour se connecter, soit le nom de l'utilisateur connecté et une option pour se déconnecter.
 * 
 * @component
 * @returns {JSX.Element} Le rendu du composant Header avec le logo, la connexion ou le profil utilisateur.
 */
export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);

  /**
   * Gère la déconnexion de l'utilisateur en déclenchant les actions Redux `logout` et `resetProfile`.
   * 
   * @param {Event} e - L'événement du clic sur le bouton de déconnexion.
   */
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(logout());
    dispatch(resetProfile());
  };

  return (
    <nav className="main-nav">
      <NavLink className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logoArgentBank}
          alt="Logo Argent Bank "
        />
        <h1 className="sr-only">Argent Bank</h1>
      </NavLink>
      <div className="main-nav-right">
        {user && profile ? (
          <>
            <NavLink to="/user" className="main-nav-item">
              <i className="fa fa-user-circle"></i>
              {profile.firstName}
            </NavLink>
            <a href="/" onClick={handleClick} className="main-nav-item">
              <i className="fa fa-sign-out"></i>
              Sign Out
            </a>
          </>
        ) : (
          <NavLink className="main-nav-item" to="/SignIn">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>
        )}
      </div>
    </nav>
  );
}
