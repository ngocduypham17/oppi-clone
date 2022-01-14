import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Poll from './components/PollList/Poll';
import Detail from './components/Detail/Detail';
import Login from './components/Login/Login';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Login/>}></Route>
        <Route path="/polllist" element={<Poll/>}></Route>
        <Route path="/detail" element={<Detail/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;