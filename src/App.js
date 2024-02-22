import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';
import './index.css';
const UserContext = createContext()

function App() {
    const [filters, setFilterData] = useState({
        name: [],
        email: []
    });
    
   

    return (
        <>
            <NavBar />
            <div className='flex'>
                <div className="w-1/6">
                    <SideBar setFilter={setFilterData}/>
                </div>
                <div className="lg:w-5/6 w-full md:mt-0 mt-20">
                <UserContext.Provider value={filters}>
                    <Outlet />
                    </UserContext.Provider>
                </div>

            </div>
        </>
    );
}

export {UserContext, App as default};
