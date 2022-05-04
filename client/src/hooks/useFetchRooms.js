import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/slices/RoomSlice";

/**
 * Custom hook that retrieves an array of rooms.
 * @returns An array of rooms.
 */
export const useFetchRooms = () => {
    const dispatch = useDispatch();
    /**
     * Stores an array of rooms.
     */
    const rooms = useSelector(state => state.room.rooms);
    useEffect(() => {
        (async () => {
            try {
                await dispatch(fetchRooms());
            } catch {
                console.error("Unable to retrieve rooms");
            }
        })();
    }, [dispatch]);
    return rooms;
}