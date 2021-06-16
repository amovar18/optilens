import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route} from 'react-router-dom';
const PrivateRouteCustomer = ({component: Component, ...rest}) => {
    const {isAuthenticated, userType} = useSelector(state => state.authentication);
    if(isAuthenticated === true && userType === 'customer'){
        return (
            <Route {...rest} render={props => (<Component {...props} />)}/>
        );
    }else{
        return (<Redirect to='/'/>);  
    }
    
};

export default PrivateRouteCustomer;