import React, { useEffect, useState} from 'react';
import "./login/index.scss";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./dashboard";
import Login from "./login"
import Homepage from "./homepage";
import {getAuth, getIdToken, onAuthStateChanged, onIdTokenChanged, getIdTokenResult} from "firebase/auth";
import {auth} from "./firebase-config";
import PrivateRoute from "./privateRoute";

const App = () => {
    const [jwt,setJwt] = useState();
    onAuthStateChanged(auth, (currentUser) => {

        localStorage.setItem('jwt', jwt);
    } )
    useEffect(() => {
        console.log(`JWT is: ${jwt}`);
    }, [jwt])
    return (
        <Routes>
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <Dashboard/>
                </PrivateRoute>
            }
            />
            <Route path="/login" element={<Login/>} />
            <Route path="/" element={<Homepage />} />
        </Routes>
    );
};

export default App;
// TODO: Разобраться с недопуском пользователя на другие страницы без аутентификации