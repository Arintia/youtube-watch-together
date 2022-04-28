import React from 'react';
import { faArrowRightToBracket, faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RoomListItem({ id, count, thumbnailImg, roomName, participantCount, isLocked }) {
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
                <button type="button" className="absolute right-0 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2">
                    <FontAwesomeIcon icon={faArrowRightToBracket} />
                </button>
            </div>     
        </div>
    );
}

export default RoomListItem;