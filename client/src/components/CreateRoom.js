import React, { useEffect, useRef } from 'react';
import { faKey, faUser, faVideo, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { createRoom, setIsCreatingRoom, setIsUsingPassword, resetCreateError } from '../redux/slices/RoomSlice';

function CreateRoom() {
    const dispatch = useDispatch();
    const isUsingPassword = useSelector(state => state.room.isUsingPassword);
    const isCreatingRoom = useSelector(state => state.room.isCreatingRoom);
    const isError = useSelector(state => state.room.roomCreateError);

    const normalLabelStyle = "text-left block mb-2 text-sm font-medium text-gray-900";
    const errorLabelStyle = "text-left block mb-2 text-sm font-medium text-red-700";

    const normalInputStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5";
    const errorInputStyle = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5";

    // Refs for input handling
    const nickname = useRef("");
    const url = useRef("");
    const password = useRef("");

    const handleCreateRoom = (e) => {
        e.preventDefault();
        const newRoom = {
            nickname: nickname.current,
            roomName: `${nickname.current}'s Room`,
            url: url.current,
            isLocked: isUsingPassword,
            customPassword: password.current
        }
        dispatch(createRoom(newRoom));
    }

    useEffect(() => () => dispatch(resetCreateError()), [dispatch]);

    return (
        <form className="relative w-full h-full flex flex-col items-center justify-center" onSubmit={handleCreateRoom}>
            <button 
                type="button" 
                className="absolute top-2 md:left-5 left-1 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
                onClick={() => isCreatingRoom && dispatch(setIsCreatingRoom(false))}
            >
                <FontAwesomeIcon className="md:px-1 md:py-1 mr-1" icon={faAngleLeft} /> Back
            </button>
            <h2 className="text-4xl text-black font-bold mb-4">Create a Room</h2>
            <div className="mb-2">
                <label 
                    htmlFor="nickname" 
                    className={isError === null ? normalLabelStyle : errorLabelStyle}
                >
                    Nickname
                </label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon className="w-5 h-5 text-gray-500 text-md" icon={faUser} />
                    </div>
                    <input 
                        type="text" 
                        id="nickname" 
                        className={isError === null ? normalInputStyle : errorInputStyle}
                        placeholder="Nickname"
                        ref={nickname}
                        onChange={(e) => nickname.current = e.target.value}
                        required 
                    />
                </div>
            </div>
            <div className="mb-2">
                <label 
                    htmlFor="video-url" 
                    className={isError === null ? normalLabelStyle : errorLabelStyle}
                >
                    Video URL
                </label>
                <div className="relative">
                    <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                        <FontAwesomeIcon className="w-5 h-5 text-gray-500 text-md" icon={faVideo} />
                    </div>
                    <input 
                        type="text" 
                        id="video-url" 
                        className={isError === null ? normalInputStyle : errorInputStyle}
                        placeholder="YouTube URL" 
                        ref={url}
                        onChange={(e) => url.current = e.target.value}
                        required
                    />
                </div>
            </div>
            <div className="flex items-center mb-4">
                <input 
                    id="password-checkbox" 
                    aria-describedby="password-checkbox" 
                    type="checkbox" 
                    className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300" 
                    checked={isUsingPassword}
                    onChange={() => dispatch(setIsUsingPassword(!isUsingPassword))}
                />
                <label 
                    for="password-checkbox" 
                    className={isError === null ? "ml-3 text-xs font-medium text-gray-900" : "ml-3 text-xs font-medium text-red-700"}
                >
                    I want to use a custom password.
                </label>
            </div>
            {
                isUsingPassword
                &&
                <div className="mb-2">
                    <label 
                        htmlFor="password" 
                        className={isError === null ? normalLabelStyle : errorLabelStyle}
                    >
                        Password
                    </label>
                    <div className="relative">
                        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <FontAwesomeIcon className="w-5 h-5 text-gray-500 text-md" icon={faKey} />
                        </div>
                        <input 
                            type="password" 
                            id="password" 
                            className={isError === null ? normalInputStyle : errorInputStyle}
                            placeholder="Password" 
                            ref={password}
                            onChange={(e) => password.current = e.target.value}
                            required
                        />
                    </div>
                </div>
            }
            { isError !== null &&
                    <p className="mb-2 text-xs text-red-700 font-bold">{isError}</p>
            }
            <button 
                type="submit" 
                className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
            >
                Create
            </button>
        </form>
    );
}

export default CreateRoom;