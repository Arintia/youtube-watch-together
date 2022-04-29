import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchRooms = createAsyncThunk(
    'rooms/fetchRooms',
    async() => {
        const res = await axios("http://localhost:3001/rooms");
        return res.data;
    }
);

export const createRoom = createAsyncThunk(
    'rooms/createRoom',
    async(payload) => {
        const res = await axios.post(`http://localhost:3001/rooms`, payload);
        return res.data;
    }
)

export const fetchRoomById = createAsyncThunk(
    'rooms/fetchRoomById',
    async(id) => {
        const res = await axios(`http://localhost:3001/rooms/${id}`);
        return res.data;
    }
)

export const RoomSlice = createSlice({
    name: "room",
    initialState: {
        rooms: [],
        isCreatingRoom: false,
        isUsingPassword: false,
        roomCreateError: null,
        createdRoomId: null,
        viewingRoomData: {},
        isRoomCreated: false,
        isLoadingRoom: true,
        completedRoomLoad: false
    },
    reducers: {
        setIsCreatingRoom: (state, action) => {
            state.isCreatingRoom = action.payload;
        },
        setIsUsingPassword: (state, action) => {
            state.isUsingPassword = action.payload;
        },
        resetCreateError: (state) => {
            state.roomCreateError = null;
        }
    },
    extraReducers: (room) => {
        room.addCase(fetchRooms.fulfilled, (state, action) => {
            if(action.payload !== state.rooms) {
                state.rooms = action.payload;
            }
        },
        room.addCase(createRoom.fulfilled, (state, action) => {
            const { data, error } = action.payload;
            if(error !== null) {
                state.roomCreateError = error;
                state.isRoomCreated = false;
            } else {
                state.createdRoomId = data.id;
                state.rooms.push(data);
                state.roomCreateError = null;
                state.isRoomCreated = true;
            }
        }),
        room.addCase(createRoom.pending, (state) => {
            state.isRoomCreated = false;
        }),
        room.addCase(createRoom.rejected, (state) => {
            state.isRoomCreated = false;
        }),
        room.addCase(fetchRoomById.fulfilled, (state, action) => {
            state.viewingRoomData = action.payload;
            state.completedRoomLoad = true;
            state.isLoadingRoom = false;
            state.isCreatingRoom = false;
            state.isRoomCreated = false;
        }),
        room.addCase(fetchRoomById.pending, (state) => {
            state.completedRoomLoad = false;
            state.isLoadingRoom = true;
        }),
        room.addCase(fetchRoomById.rejected, (state) => {
            state.completedRoomLoad = true;
            state.isLoadingRoom = false;
            state.isRoomCreated = false;
            state.roomCreateError = "Error fetching room";
        }));
    }
});

export const { setIsCreatingRoom, setIsUsingPassword, resetCreateError } = RoomSlice.actions;
export default RoomSlice.reducer;