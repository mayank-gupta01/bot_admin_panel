import "./App.css";
import Login from "../src/components/Login";
import { useState } from "react";
import Logout from "./components/Logout";
import { googleLogout } from "@react-oauth/google";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const adminHandler = () => {
    setIsAdmin(true);
  }
  const loginHandler = () => {
    setLoggedIn(true);
  };
  const logoutHandler = () => {
    googleLogout();
    setLoggedIn(false);
    setIsAdmin(false);
  };
  return (
    <div>
      {!isLoggedIn && <Login setAdmin={adminHandler} onLoggedIn={loginHandler}></Login>}
      {isLoggedIn && isAdmin && <Logout onLoggedOut={logoutHandler}></Logout>}
      {isLoggedIn && !isAdmin && <h1>You are not an Admin!</h1>}
    </div>
  );
}

export default App;
