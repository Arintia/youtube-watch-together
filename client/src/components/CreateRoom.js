import React, { useEffect, useRef, useState } from 'react';
import { faKey, faUser, faVideo, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { createRoom, setIsCreatingRoom, setIsUsingPassword, resetCreateError } from '../redux/slices/RoomSlice';
import { useNavigate } from 'react-router-dom';

function CreateRoom() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUsingPassword = useSelector(state => state.room.isUsingPassword);
    const isCreatingRoom = useSelector(state => state.room.isCreatingRoom);
    const isError = useSelector(state => state.room.roomCreateError);
    const createdRoomId = useSelector(state => state.room.createdRoomId);
    const isRoomCreated = useSelector(state => state.room.isRoomCreated);
    const [isSubmitted, setSubmitted] = useState(false);

    const normalLabelStyle = "text-left block mb-2 text-sm font-medium text-gray-900";
    const errorLabelStyle = "text-left block mb-2 text-sm font-medium text-red-700";

    const normalInputStyle = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5";
    const errorInputStyle = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full pl-10 p-2.5";

    // Refs for input handling
    const nickname = useRef("");
    const url = useRef("");
    const password = useRef("");

    const handleCreateRoom = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const newRoom = {
            nickname: nickname.current,
            roomName: `${nickname.current}'s Room`,
            url: url.current,
            isLocked: isUsingPassword,
            customPassword: password.current
        }
        await dispatch(createRoom(newRoom));
    }

    useEffect(() => () => dispatch(resetCreateError()), [dispatch]);

    useEffect(() => {
        setTimeout(() => {
            if(createdRoomId !== null && isRoomCreated) {
                navigate(`/room/${createdRoomId}`);
            }
        }, 2000);
    }, [createdRoomId, navigate, isRoomCreated]);

    useEffect(() => {
        if(isError) setSubmitted(false);
    }, [isError])

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
                    htmlFor="password-checkbox" 
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
            {
                isSubmitted 
                ?
                <button disabled type="button" className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-center">
                    <svg role="status" className="inline w-4 h-4 mr-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                    </svg>
                    Loading
                </button>
                :
                <button 
                    type="submit" 
                    className="w-1/3 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                Create
                </button>
            }
            
        </form>
    );
}

export default CreateRoom;