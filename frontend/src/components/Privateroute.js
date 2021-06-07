import React, { useEffect , useRef} from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route} from 'react-router-dom';
import Loadingspinner from './Loadingspinner';
const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated, userType} = useSelector(state => state.authentication);  
    const fetched = useRef(false);
    useEffect(()=>{
        fetched.current=true;
    },[]);
    if(fetched.current === false){
        return(<Loadingspinner/>);
    }else if(fetched.current === true && (userType==='' || userType ==='customer')){
        return (
            <Route {...rest} render={props => (<Component {...props} />)}/>
        );
    }else if(isAuthenticated===true && userType==='seller'){
        return (<Redirect to='/insertproduct'/>); 
    }
};

export default PrivateRoute;