import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket, faLock, faLockOpen, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import placeholder from "./asset/placeholder.png";
import { faGithub } from '@fortawesome/free-brands-svg-icons';

function App() {
  return (
    <div className="w-screen h-screen bg-slate-100 overflow-hidden">
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
      <header className="h-1/4 max-w-full bg-red-600 border-red-500 flex justify-center items-center">
        <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="md:text-2xl text-lg text-white text-center">Watch YouTube Videos With Your Friends</h1>
        <p className="mt-2 text-white md:text-md text-sm text-center">Discover the platform that allows you to watch YouTube videos with your friends, chat with them live and secure your room with your own custom password.</p>
        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mb-2">Create a room</button>
        <p className="text-white text-xs text-center">* This app is completely free and open source.</p>
        </div>
      </header>
      <main className="mt-2 rounded-3xl h-3/5 md:w-1/2 bg-white flex flex-col mx-auto">
        <header className="flex rounded-3xl md:flex-row flex-col justify-evenly items-center w-full max-h-24 mt-2">
            <div className="relative md:w-1/2 w-full">
              <div className="flex absolute top-3.5 left-0 items-center pl-3 pointer-events-none">
                <FontAwesomeIcon className="opacity-50" icon={faSearch} />
              </div>
              <input type="text" className="bg-slate-50 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Room name" />
            </div>
            <div>
              <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 w-full md:mt-0 mt-2">
                <FontAwesomeIcon className="w-4 h-4 mr-2 -ml-1" icon={faPlus} />
                Create new
                
              </button>
            </div>
        </header>
        <div className="overflow-y-auto container h-full bg-gray-50 mt-3">
          <div id="room" className="h-16 bg-white w-full border-t border-x border-solid border-slate-200 border-opacity-50 flex flex-row justify-start items-center">
            <h2 className="w-1/5 text-center text-xl opacity-50">1</h2>
            <div className="w-1/5">
              <img src={placeholder} width="60px" height="35px" alt="Thumbnail"/>
            </div>
            <p className="w-1/5 text-center">Test's Room</p>
            <p className="w-1/5 text-center"><span className="opacity-50 font-bold">10</span><br /> joined</p>
            <div className="w-1/5 relative">
              <FontAwesomeIcon icon={faLockOpen} />
              <button type="button" className="absolute right-0 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2">
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </button>
            </div>     
          </div>
        </div>
      </main>
      <footer className="absolute bottom-0 right-0 text-gray-800">
        <p className="mr-2 mb-2 text-sm md:text-lg">Developed by Yigit Atak <a href="https://github.com/Arintia/youtube-watch-together"><FontAwesomeIcon className="ml-1 text-md md:text-2xl" icon={faGithub} /></a></p>
      </footer>
    </div>
  );
}

export default App;
