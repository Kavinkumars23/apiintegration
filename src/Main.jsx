import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.js';
import Customers from './Pages/Customers.jsx'; // Import the Customers component
import Login from './Pages/Login.jsx';

export default function Main() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/Home" element={<App />}>
          <Route path="/Home/Customer" element={<Customers />} />
          <Route path="/Home/Customer/:id" element={<Customers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
