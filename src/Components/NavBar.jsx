import React from 'react'
import { Link } from "react-router-dom";
import { useState } from "react"
import { FaBars, FaTimes } from "react-icons/fa";
import { links } from '../Constants/TableConstants';
import { logo } from '../Constants/TableConstants';

const NavBar = () => {
    const [nav, setnav] = useState(false);

    return (
      <div className="flex justify-between items-center w-full h-20 text-white bg-gradient-to-r from-gray-800 to-black fixed px-4">
        <div>
          <h1 className="text-3xl font-signature ml-2">{logo}</h1>
        </div>
        <ul className="hidden md:flex">
          {links &&
            Array.isArray(links) &&
            links.map((link) => (
              <li
                key={link.id}
                className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-110 duration-200"
              >
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
        </ul>

        <div
          onClick={() => setnav(!nav)}
          className="cursor-pointer pr-4 z-10 text-gray-500 md:hidden"
        >
          {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
        </div>

        {nav && (
          <ul className="flex flex-col justify-center items-center absolute top-0 left-0 w-full h-screen bg-gradient-to-b from-black to-gray-800 text-gray-500">
            {links.map((link) => (
              <li
                key={link.id}
                className="px-4 cursor-pointer capitalize font-medium text-gray-500 hover:scale-110 duration-200"
              >
                <Link to={link.link}>{link.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}

export default NavBar