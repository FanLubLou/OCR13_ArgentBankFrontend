import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "./HeaderFooter/Footer";
import Header from "./HeaderFooter/Header";

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Error from "./pages/Error/Error";


export default function App() {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path='*' element={<Error />} />
        </Routes>
      <Footer/>
    </BrowserRouter>
    
  )
}
