import React from 'react';
import { faArrowRightToBracket, faLock, faLockOpen, faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import placeholder from "../asset/placeholder.png";
import { useDispatch, useSelector } from "react-redux";
import { setIsCreatingRoom } from '../redux/slices/RoomSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Rooms() {
    const dispatch = useDispatch();
    const isCreatingRoom = useSelector(state => state.room.isCreatingRoom);
    return (
    <React.Fragment>
        <header className="flex rounded-3xl md:flex-row flex-col justify-evenly items-center w-full max-h-24 mt-2">
            <div className="relative md:w-1/2 w-full">
                <div className="flex absolute top-3.5 left-0 items-center pl-3 pointer-events-none">
                <FontAwesomeIcon className="opacity-50" icon={faSearch} />
                </div>
                <input type="text" className="bg-slate-50 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Room name" />
            </div>
            <div>
                <button 
                type="button" 
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 w-full md:mt-0 mt-2"
                onClick={() => !isCreatingRoom && dispatch(setIsCreatingRoom(true))}
                >
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
    </React.Fragment>
  );
}

export default Rooms;