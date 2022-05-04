import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { faCrown, faEnvelope, faUsers } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useLayoutEffect, useMemo } from "react";
import { fetchRoomById, resetViewingRoom, increaseRoomParticipant, decreaseRoomParticipant } from "../redux/slices/RoomSlice";
import { io } from "socket.io-client";

export default function Room() {
    /**
     * Used for checking URL params.
     */
    const params = useParams();
    /**
     * Room ID fetched from the URL param.
     */
    const roomId = params.roomid;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    /**
     * Tracks whether or not the Backend API call is processed, true if processed false if not.
     */
    const completedRoomLoad = useSelector(state => state.room.completedRoomLoad);
    /**
     * Contains the data object of the room being viewed.
     */
    const viewingRoomData = useSelector(state => state.room.viewingRoomData);

    /**
     * Before DOM is painted, fetch the data for the room that's currently being viewed.
     */
    useLayoutEffect(() => {
        (async () => await dispatch(fetchRoomById(roomId)))();
        
    }, [dispatch, roomId]);
    
    /**
     * If the room doesn't exist, use react-router to navigate them back to the root directory.
     */
    useEffect(() => {
        if(!Object.keys(viewingRoomData).length && completedRoomLoad) {
            navigate("/");
        }
    }, [navigate, viewingRoomData, completedRoomLoad]);

    /**
     * Using useMemo hook ensures socket connection is established once and not every time a component re-renders.
     */
    const socket = useMemo(() => io("http://127.0.0.1:3001", { transports: ["websocket"]}), []);

    /**
     * If the backend API call is processed and a room is returned, send a backend socket call.
     */
    useEffect(() => {
        if(completedRoomLoad) {
            socket.emit("join", viewingRoomData.id);
        }
    }, [socket, completedRoomLoad, viewingRoomData.id]);

    /**
     * Disconnect the socket upon component dismount.
     */
    useEffect(
        () => 
        () => {
            socket.disconnect();
            dispatch(resetViewingRoom());
        }
    ,[dispatch, socket]);
    
    return (
        <div className="w-screen h-screen bg-slate-100 overflow-hidden">
            <Navbar />
            <main className="w-screen h-full flex md:flex-row flex-col justify-evenly items-center">
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <iframe 
                        className="w-3/4 h-1/2"
                        src={`https://www.youtube.com/embed/${viewingRoomData.youtubeUrl}`}
                        title="YouTube video player" 
                        frameBorder="0" 
                        allowFullScreen
                    >
                    </iframe>
                    <div className="w-full flex flex-col justify-start ml-[25%]">
                        <h2 className="text-xl text-bold mt-2">{viewingRoomData.videoName}</h2>
                        <p className="opacity-50">Room created by <span>{viewingRoomData.ownerName}</span></p>
                        <p className="opacity-50">
                            <FontAwesomeIcon className="mr-1" icon={faUsers} /> {viewingRoomData.participantCount} joined
                        </p>
                    </div>
                    
                </div>
                <div className="w-full h-full flex flex-row items-center">
                <div className="h-3/4 w-1/2 bg-white rounded-2xl mr-10 mb-10">
                    <h6 className="text-lg border-b border-gray-400 text-center border-opacity-50 text-bold">Chat</h6>

                    <form className="h-full w-full flex items-end justify-evenly">
                        <textarea className="max-h-24 mb-10 resize-none overflow-y-auto bg-slate-100 border border-slate-200 rounded-xl p-2"></textarea>
                        <button 
                            type="submit" 
                            className="text-black hover:text-slate-600 font-medium text-4xl mb-[15%]"
                        >
                            <FontAwesomeIcon icon={faEnvelope} />
                        </button>
                    </form>
                </div>
                <div className="h-1/2 w-1/3 bg-white rounded-2xl mr-10 mb-10 border-slate-50 border max-h-[1/2] overflow-y-auto">
                    <h6 className="text-lg border-b border-gray-400 text-center border-opacity-50 text-bold">Participant List</h6>
                    <ul className="mt-2 pl-2">
                        <li>Test<FontAwesomeIcon className="ml-2" icon={faCrown} /></li>
                        <li>Another Test</li>
                    </ul>
                </div>
                

                </div>
            </main>
            <Footer />
        </div>
    );
}