import React, { useState, useEffect, createContext } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import "./index.css";
import apiService from "./Constants/ApiServices";

const UserContext = createContext();

function App() {
  const [tableDatas, setTableRows] = useState([]);
  

  
  useEffect(() => {
    apiService
      .getCustomersData()
      .then((data) => {
        setTableRows(data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  

  return (
    <>
    <UserContext.Provider value={tableDatas}>
      <NavBar />
      <div className="flex">
        <div className="w-1/6">
          <SideBar />
        </div>
        <div className="lg:w-5/6 w-full md:mt-0 mt-20">
          <Outlet />
        </div>
      </div>
      </UserContext.Provider>
    </>
  );

}

export { UserContext, App as default };
