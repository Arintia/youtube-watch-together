import React, { useEffect, useRef } from 'react';
import { faArrowRightToBracket, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function RoomListItem({ id, count, thumbnailImg, roomName, participantCount, isLocked, password }) {
    const navigate = useNavigate();
    /**
     * Modal ref object for the password modal.
     */
    const pwModal = useRef();
    /**
     * Input ref
     */
    const inputPassword = useRef();
    /**
     * Handles the button click for joining a room. If there's no password, user is navigated to the room instantly.
     * If there's a password, they're shown the password modal.
     */
    const handleRoomJoin = () => {
        if(!isLocked) {
            navigate(`/room/${id}`);
        } else {
            pwModal.current.classList.toggle("hidden");
        }
    }

    /**
     * Assigns the modal to the ref object.
     */
    useEffect(() => {
        pwModal.current = document.getElementById("roompw-modal");
    }, []);

    /**
     * Checks the password and navigates user to the room if the password was correct.
     * @param {*} e - An event object. 
     */
    const handleRoomJoinPassword = (e) => {
        e.preventDefault();
        if(inputPassword.current === password) {
            navigate(`/room/${id}`);
        }
    }



    return (
        <div id="room" className="h-16 bg-white w-full border-t border-x border-solid border-slate-200 border-opacity-50 flex flex-row justify-start items-center">
            <h2 className="w-1/5 text-center text-xl opacity-50">{count+1}</h2>
            <div className="w-1/5">
                <img src={thumbnailImg} width="60px" height="35px" alt="Thumbnail"/>
            </div>
            <p className="w-1/5 text-center">{roomName}</p>
            <p className="w-1/5 text-center"><span className="opacity-50 font-bold">{participantCount}</span><br /> joined</p>
            <div className="w-1/5 relative">
                {
                    isLocked
                    ?
                    <FontAwesomeIcon icon={faLock} />
                    :
                    <FontAwesomeIcon icon={faLockOpen} />
                }
                <button 
                    type="button" 
                    className="absolute right-0 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2"
                    onClick={handleRoomJoin}
                >
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                </button>
            </div>   
            {
                isLocked 
                && 
                <div id="roompw-modal" tabIndex={1} aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
                    <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="py-6 px-6 lg:px-8">
                                <form className="space-y-6" onSubmit={handleRoomJoinPassword}>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your password</label>
                                        <input 
                                            type="password" 
                                            name="password" 
                                            id="password" 
                                            placeholder="••••••••" 
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                                            ref={inputPassword.current}
                                            onChange={(e) => inputPassword.current = e.target.value}
                                            required 
                                            />
                                    </div>
                                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login to your account</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>   
            }
            
        </div>
    );
}

export default RoomListItem;