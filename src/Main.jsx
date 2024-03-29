import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.js";
import Customers from "./Pages/Customers.jsx";
import Login from "./Pages/Login.jsx";
import Private from "./Utilis/Private.jsx";
import { useSelector } from "react-redux";

export default function Main() {
 
  const access = localStorage.getItem("token");
  const [isSignedIn, setIsSignedIn] = useState(access !== null);
  useEffect(() => {
    localStorage.removeItem("token");
  }, []);

  return (
    <BrowserRouter>
      <Routes>2
        <Route
          path="/"
          element={<Login setIsSignedIn={setIsSignedIn} />}
        ></Route>
        <Route
          path="/Home"
          element={
            <Private isSignedIn={isSignedIn}>
              <App />
            </Private>
          }
        >
          <Route
            path="/Home/Customer"
            element={
              <Private isSignedIn={isSignedIn}>
                <Customers />
              </Private>
            }
          />
          <Route
            path="/Home/Customer/:id"
            element={
              <Private isSignedIn={isSignedIn}>
                <Customers />
              </Private>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
