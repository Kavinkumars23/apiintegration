import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import "./index.css";
import apiService from "./Constants/ApiServices";
import Swal from "sweetalert2";

const UserContext = createContext();

function App() {
  const [tableDatas, setTableRows] = useState([]);
  useEffect(() => {
    apiService
      .getCustomersData()
      .then((response) => {
        if (response && response.data) {
          setTableRows(response.data);
        }
      })
      .catch((error) =>
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        })
      );
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
