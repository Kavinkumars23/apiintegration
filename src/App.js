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
  const [tableRows, setTableRows] = useState([]);
  const navigate = useNavigate();

  function handleRowClick(id) {
    navigate(`/Customer/${id}`);
  }

  
  useEffect(() => {
    console.log("fetch data in app");
    apiService
      .getCustomersData()
      .then((data) => {
        setTableRows(data.data);
      })
      .catch((error) => console.log(error));
  }, []);
  

  return (
    <>
      <NavBar />
      <div className="flex">
        <div className="w-1/6">
          <SideBar tableDatas={tableRows} handleSelectedRow={handleRowClick} />
        </div>
        <div className="lg:w-5/6 w-full md:mt-0 mt-20">
          <Outlet />
        </div>
      </div>
    </>
  );

}

export { UserContext, App as default };
