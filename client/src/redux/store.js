import { configureStore } from '@reduxjs/toolkit';
import RoomSlice from './slices/RoomSlice';

export const store = configureStore({
    reducer: {
        room: RoomSlice
    }
});