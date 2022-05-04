import React from 'react';
import ReactDOMClient from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Room from './routes/Room';

/**
 * Provider component makes the Redux store available to nested components, thus allowing us to use the slice.
 * BrowserRouter syncs our UI with our URL. 
 * Routes basically acts like a <Switch> and is a new react-router functionality.
 **/ 
const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="room/:roomid" element={<Room />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
