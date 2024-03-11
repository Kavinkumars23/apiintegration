import React, { useState, useEffect, createContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import SideBar from "./Components/SideBar";
import "./index.css";
import apiService from "./Constants/ApiServices";
import Swal from "sweetalert2";
import RedirectMessage from "./Components/RedirectMessage";

const UserContext = createContext();

function App() {
  const [tableDatas, setTableRows] = useState([]);
  const [timeOutModel, setTimeOutModel] = useState(false);
  const navigate = useNavigate();
  let inactivityTimer;
  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      setTimeOutModel(true);
    }, 10000);
  };

const navigateToModel = () => {
    navigate("/");
}

  useEffect(() => {
    // Add event listener for mouse movement to reset inactivity timer
    const handleMouseMove = () => {
      resetInactivityTimer(); 
    };

    document.addEventListener("mousemove", handleMouseMove);
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
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(inactivityTimer);
    };
  }, [navigate]);

  return (
    <>
      {timeOutModel && (
        <RedirectMessage
          navigateLogin={navigateToModel}
        
          setIsModelOpen={setTimeOutModel}
        />
      )}
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
