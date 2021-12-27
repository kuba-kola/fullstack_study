import React from "react";
import {Routes, Route} from "react-router-dom";
import {AdminPage} from "./pages/AdminPage";
import {UsersPage} from "./pages/UsersPage";
import {MessagePage} from "./pages/MessagePage";
import {AuthPage} from "./pages/AuthPage";


export const UseRoutes = isLogin => {
    if(isLogin) {
        return(
            <Routes>
                <Route path = '/admin' element={<AdminPage/>} />                 
                <Route path = '/user' element={<UsersPage/>} />                
                <Route path = '/message/:id' element={<MessagePage/>} />                
            </Routes> 
        )
    }

    return(
        <Routes>
            <AuthPage/>      
        </Routes>
    )
}