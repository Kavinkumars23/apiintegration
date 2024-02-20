import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.js';
import Customers from './Pages/Customers.jsx'; // Import the Customers component
import Home from './Pages/Home.jsx';

export default function Main() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} >
        <Route path="/Customer" element={<Customers />} />
        <Route path="/home" element={<Home />} />
      </Route>
      </Routes>
    </BrowserRouter>
  );
}
