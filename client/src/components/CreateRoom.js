import React, { useState } from 'react';
import { faKey, faUser, faVideo, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCreatingRoom, setIsUsingPassword } from '../redux/slices/RoomSlice';

function CreateRoom() {
    const dispatch = useDispatch();
    const isUsingPassword = useSelector(state => state.room.isUsingPassword);
    const isCreatingRoom = useSelector(state => state.room.isCreatingRoom);

    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center">
            <button 
                type="button" 
                className="absolute top-2 md:left-5 left-1 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
                onClick={(e) => isCreatingRoom && dispatch(setIsCreatingRoom(false))}
            >
                <FontAwesomeIcon className="md:px-1 md:py-1 mr-1" icon={faAngleLeft} /> Back
            </button>
            <h2 className="text-4xl text-black font-bold mb-4">Create a Room</h2>
            <div className="mb-2">
                <label htmlFor="username" className="text-left block mb-2 text-sm font-medium text-gray-900">Username</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon className="w-5 h-5 text-gray-500 text-md" icon={faUser} />
                    </div>
                    <input type="text" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Username" />
                </div>
            </div>
            <div className="mb-2">
                <label htmlFor="video-url" className="text-left block mb-2 text-sm font-medium text-gray-900">Video URL</label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon className="w-5 h-5 text-gray-500 text-md" icon={faVideo} />
                    </div>
                    <input type="text" id="video-url" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="YouTube URL" />
                </div>
            </div>
            <div className="flex items-center mb-4">
                <input 
                    id="password-checkbox" 
                    aria-describedby="password-checkbox" 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300" 
                    checked={isUsingPassword}
                    onChange={(e) => dispatch(setIsUsingPassword(!isUsingPassword))}
                />
                <label for="password-checkbox" className="ml-3 text-xs font-medium text-gray-900">I want to use a custom password.</label>
            </div>
            {
                isUsingPassword
                &&
                <div className="mb-2">
                    <label htmlFor="password" className="text-left block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon className="w-5 h-5 text-gray-500 text-md" icon={faKey} />
                        </div>
                        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Password" />
                    </div>
                </div>
            }
            <button 
                type="button" 
                className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
                Create
            </button>
        </div>
    );
}

export default CreateRoom;