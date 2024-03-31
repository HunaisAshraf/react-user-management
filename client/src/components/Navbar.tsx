import React from "react";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow-md">
      <div className="">
        <h1 className="text-3xl font-semibold">AECH</h1>
      </div>
      <div className="flex items-center gap-3">
        <p>user</p>
        <FaUserCircle size={30} />
      </div>
    </nav>
  );
};

export default Navbar;
