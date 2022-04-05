import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const PrivateRouteCustomer = ({children, ...rest}) => {
    const {isAuthenticated, userType} = useSelector(state => state.authentication);
    return (isAuthenticated === true && userType === 'customer') ? children :<Navigate to='/'/>;  
};

export default PrivateRouteCustomer;