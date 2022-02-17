import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, CACHED_URL } from "./constants/localStorage";
import clientPath from "./constants/clientPath";
import Login from "./containers/Login";
import Poll from "./containers/PollList/Poll";
import PollDetail from "./containers/PollDetail/PollDetail";

function App() {
  const { LOGIN, POLLLIST, POLLDETAIL, ROOT } = clientPath;
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const cachedUrl = localStorage.getItem(CACHED_URL);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={ROOT} element={<Navigate to={LOGIN} />}></Route>
          <Route
            path={LOGIN}
            element={accessToken ? <Navigate to={cachedUrl} /> : <Login />}
          ></Route>
          <Route
            path={POLLLIST}
            element={
              <ProtectedRoute>
                <Poll />
              </ProtectedRoute>
            }
          ></Route>

          <Route
            path={POLLDETAIL}
            element={
              <ProtectedRoute>
                <PollDetail />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
