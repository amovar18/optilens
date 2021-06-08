import React, { useEffect , useRef} from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route} from 'react-router-dom';
import Loadingspinner from './Loadingspinner';
const PrivateRouteCustomer = ({component: Component, ...rest}) => {
    const {isAuthenticated, userType} = useSelector(state => state.authentication);
    const fetched = useRef(false);
    useEffect(()=>{
        fetched.current=true;
    },[]);
    if(fetched.current === false){
        return(<Loadingspinner/>);
    }else if(isAuthenticated === true && userType === 'customer'){
        return (
            <Route {...rest} render={props => (<Component {...props} />)}/>
        );
    }else{
        return (<Redirect to='/'/>);  
    }
    
};

export default PrivateRouteCustomer;