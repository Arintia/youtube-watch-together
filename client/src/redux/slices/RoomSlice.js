import { createSlice } from "@reduxjs/toolkit";

export const RoomSlice = createSlice({
    name: "room",
    initialState: {
        isCreatingRoom: false
    },
    reducers: {
        setIsCreatingRoom: (state, action) => {
            state.isCreatingRoom = action.payload;
        }
    }
});

export const { setIsCreatingRoom } = RoomSlice.actions;
export default RoomSlice.reducer;