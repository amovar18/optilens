import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route} from 'react-router-dom';
import Loadingspinner from './Loadingspinner';
const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated, userType} = useSelector(state => state.authentication);  
    if(isAuthenticated==='loading' && userType===''){
        return(<Loadingspinner/>);
    }else if(userType==='' || userType ==='customer'){
        return (
            <Route {...rest} render={props => (<Component {...props} />)}/>
        );
    }else if(isAuthenticated===true && userType==='seller'){
        return (<Redirect to='/insertproduct'/>); 
    }
};

export default PrivateRoute;