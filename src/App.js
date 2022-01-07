import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PollList from './components/PollList/PollList';

function App() {
  return (
    <div className="wrapper">
      <h1>Application</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/polllist">
            <PollList />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;