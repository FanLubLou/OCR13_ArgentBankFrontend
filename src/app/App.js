import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "../HeaderFooter/Footer/Footer";
import Header from "../HeaderFooter/Header/Header";

import Home from "../pages/home/Home";
import SignIn from "../pages/SignIn/SignIn";
import User from "../pages/User/User";
import Error from "../pages/Error/Error";

/**
 * Composant principal de l'application. Gère le routage entre les différentes pages.
 *
 * @component
 * @returns {JSX.Element} L'application avec les routes principales et la navigation.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          {/* Route vers la page d'accueil */}
          <Route path="/" element={<Home />} />
          
          {/* Route vers la page de connexion */}
          <Route path="/SignIn" element={<SignIn />} />
          
          {/* Route vers la page utilisateur (accessible après connexion) */}
          <Route path="/User" element={<User />} />
          
          {/* Route pour la gestion des erreurs ou routes non trouvées */}
          <Route path='*' element={<Error />} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
