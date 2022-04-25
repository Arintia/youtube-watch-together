import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms } from "../redux/slices/RoomSlice";

export const useFetchRooms = () => {
    const dispatch = useDispatch();
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