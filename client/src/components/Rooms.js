import React, { useEffect, useState } from 'react';
import { faPlus, faSearch, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { setIsCreatingRoom } from '../redux/slices/RoomSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFetchRooms } from '../hooks/useFetchRooms';
import Room from './Room';

function Rooms() {
    const dispatch = useDispatch();
    const isCreatingRoom = useSelector(state => state.room.isCreatingRoom);
    const [searchKey, setSearchKey] = useState("");
    const rooms = useFetchRooms();
    const [filteredRooms, setFilteredRooms] = useState([]);

    useEffect(() => {
        setFilteredRooms(rooms.filter(room => room.roomName.includes(searchKey)));
    }, [searchKey, rooms]);

    return (
    <React.Fragment>
        <header className="flex rounded-3xl md:flex-row flex-col justify-evenly items-center w-full max-h-24 mt-2">
            <div className="relative md:w-1/2 w-full">
                <div className="flex absolute top-3.5 left-0 items-center pl-3 pointer-events-none">
                <FontAwesomeIcon className="opacity-50" icon={faSearch} />
                </div>
                <input 
                    type="text" 
                    className="bg-slate-50 border-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" 
                    placeholder="Room name" 
                    value={searchKey}
                    onChange={(e) => setSearchKey(e.target.value)}
                />
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
            {
                filteredRooms.length 
                ?
                filteredRooms.map((room, index) => 
                    <Room 
                        key={room.id} 
                        id={room.id}
                        count={index}
                        thumbnailImg={room.thumbnailImg} 
                        roomName={room.roomName} 
                        participantCount={room.participantCount} 
                        isLocked={room.isLocked}    
                    /> 
                )
                :
                <div className="h-full w-full bg-white flex flex-col items-center justify-center">
                    <FontAwesomeIcon className="text-6xl" icon={faTriangleExclamation} />
                    <p className="text-center">You either searched for a non-existent room or there are no rooms currently. <br/>Why don't you create one?</p>
                </div>
            }
            
        </div>
    </React.Fragment>
  );
}

export default Rooms;