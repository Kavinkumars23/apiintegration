import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.js';
import Customers from './Pages/Customers.jsx'; // Import the Customers component

export default function Main() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/Customer" element={<Customers />} />
          <Route path="/Customer/:id" element={<Customers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
