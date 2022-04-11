import React from 'react';
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const [jwt, setJwt] = 1;
    return jwt ? children : <Navigate to="/login"/>;
};

export default PrivateRoute;