import React from 'react';
import { Link } from 'react-router-dom';
function Navbar() {
  return (
    <nav
        className="lg:h-16 h-24 w-full flex items-center bg-white border-slate-50"
    >
        <header id="logo" className="w-full h-full flex justify-start items-center">
            <h1 className="md:text-2xl text-xl ml-6 mr-2">WatchTogether</h1>
        </header>
        <div className="w-full h-full flex justify-end items-center">
            <Link className="btn bg-orange-600 mr-6 border-orange-500 md:text-lg rounded px-2 py-2 text-white" to="/">Rooms</Link>
        </div>
    </nav>
  );
}

export default Navbar;