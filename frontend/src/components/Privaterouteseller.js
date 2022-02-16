import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const PrivateRouteSeller = ({children}) => {
    const {isAuthenticated, userType} = useSelector(state => state.authentication);
    return (isAuthenticated===true && userType==='seller') ? children : <Navigate to='/'/>;   
};

export default PrivateRouteSeller;