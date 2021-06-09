import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route} from 'react-router-dom';
const PrivateRouteSeller = ({component: Component, ...rest}) => {
    const {isAuthenticated, userType} = useSelector(state => state.authentication);
    if(isAuthenticated===true && userType==='seller'){
        return (
            <Route {...rest} render={props => (<Component {...props} />)}/>
        );
    }else{
        return (<Redirect to='/'/>);   
    }
};

export default PrivateRouteSeller;