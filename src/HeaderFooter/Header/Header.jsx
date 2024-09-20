import React from 'react';
import "./Header.scss";

import logoArgentBank from "./../../assets/img/argentBankLogo.png";
import { NavLink } from "react-router-dom";
  
  
  
export default function Header() {
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
          <NavLink className="main-nav-item" to="/SignIn">
            <i className="fa fa-user-circle"></i>
            Sign In
          </NavLink>                  
      </div>
    </nav>
  );
}