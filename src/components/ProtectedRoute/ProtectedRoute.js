import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { CACHED_URL, ACCESS_TOKEN } from "../../constants/localStorage";
import clientPath from "../../constants/clientPath";

function ProtectedRoute({ children }) {
  const location = useLocation();
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  const isLoggedIn = Boolean(accessToken);

  localStorage.setItem(CACHED_URL, location.pathname);
  const cachedUrl = localStorage.getItem(CACHED_URL);

  if (isLoggedIn) {
    return children;
  }
  if (isLoggedIn && cachedUrl) {
    return <Navigate to={cachedUrl} />;
  }
  if (!isLoggedIn && cachedUrl) {
    localStorage.removeItem(CACHED_URL);
    return <Navigate to={clientPath.LOGIN} />;
  }
  return <Navigate to={clientPath.LOGIN} />;
}


export default ProtectedRoute;