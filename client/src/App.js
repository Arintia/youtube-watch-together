import React from 'react';
import { Link } from 'react-router-dom';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Rooms from './components/Rooms';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CreateRoom from './components/CreateRoom';
import { setIsCreatingRoom } from './redux/slices/RoomSlice';

function App() {
  const dispatch = useDispatch();
  const isCreatingRoom = useSelector(state => state.room.isCreatingRoom);
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
        <button 
          type="button" 
          className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 mb-2"
          onClick={() => !isCreatingRoom && dispatch(setIsCreatingRoom(true))}
      >
        Create a room
      </button>
        <p className="text-white text-xs text-center">* This app is completely free and open source.</p>
        </div>
      </header>
      <main className="mt-2 rounded-3xl h-3/5 md:w-1/2 bg-white flex flex-col mx-auto">
        {
          isCreatingRoom 
          ? 
          <CreateRoom />
          :
          <Rooms />
        }
        
      </main>
      <footer className="absolute bottom-0 right-0 text-gray-800">
        <p className="mr-2 mb-2 text-sm md:text-lg">Developed by Yigit Atak <a href="https://github.com/Arintia/youtube-watch-together"><FontAwesomeIcon className="ml-1 text-md md:text-2xl" icon={faGithub} /></a></p>
      </footer>
    </div>
  );
}

export default App;
