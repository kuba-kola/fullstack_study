import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import 'materialize-css';
import {UseRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import { AuthContext } from "./context/AuthContext";


function App() {
  const {token, login, logout, userId} = useAuth()
  const isLogin = !!token
  const routes = UseRoutes(isLogin)

  return (
    <AuthContext.Provider value={{token, login, logout, userId, isLogin}}>
      <BrowserRouter>
        <Route path="/" element={routes} />
      </BrowserRouter>
    </AuthContext.Provider>
  )
  
}

export default App;
