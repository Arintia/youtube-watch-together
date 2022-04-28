import React from 'react';
import Rooms from './components/Rooms';
import { useDispatch, useSelector } from 'react-redux';
import CreateRoom from './components/CreateRoom';
import { setIsCreatingRoom } from './redux/slices/RoomSlice';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();
  const isCreatingRoom = useSelector(state => state.room.isCreatingRoom);
  return (
    <div className="w-screen h-screen bg-slate-100 overflow-hidden">
      <Navbar />
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
      <Footer />
    </div>
  );
}

export default App;
