import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute.js";
import { Navigate } from "react-router-dom";
import { ADMIN_TOKEN, CACHED_URL } from "./constants/localStorage";
import clientPath from "./constants/clientPath";
import Poll from './components/PollList/Poll';
import Detail from './components/PollDetail/PollDetail';
import Login from './components/Login/Login';

function App() {
  const { LOGIN, POLLLIST, POLLDETAIL, ROOT } = clientPath;
  const accessToken = sessionStorage.getItem(ADMIN_TOKEN);
  const cachedUrl = localStorage.getItem(CACHED_URL);
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path={ROOT} element={<Login/>}></Route>
        <Route path={POLLLIST} element={<Poll/>}></Route>
        <Route path={POLLDETAIL} element={<Detail/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;