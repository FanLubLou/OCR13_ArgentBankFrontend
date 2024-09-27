import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "../HeaderFooter/Footer/Footer";
import Header from "../HeaderFooter/Header/Header";

import Home from "../pages/home/Home";
import SignIn from "../pages/SignIn/SignIn";
import User from "../pages/User/User";
import Error from "../pages/Error/Error";


export default function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/User" element={<User />} />
          <Route path='*' element={<Error />} />
        </Routes>
      <Footer/>
    </BrowserRouter>
    
  )
}
