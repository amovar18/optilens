import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect, Route} from 'react-router-dom';
import Loadingspinner from './Loadingspinner';
const PrivateRouteCustomer = ({component: Component, ...rest}) => {
    const [isallowed,setAllowed] = useState('loading');
    useEffect(()=>{
        axios({
            method:'GET',
            url:'http://localhost:5000/user/allowed',
            withCredentials:true
        }).then((response)=>{
            setAllowed(response.data);
        }).catch((error)=>{
            setAllowed(false);
        })
    })
    if(isallowed==='loading'){
        return(<Loadingspinner/>);
    }else if(isallowed===true){
        return (
            <Route {...rest} render={props => (<Component {...props} />)}/>
        );
    }else if(isallowed===false){
        return (<Redirect to='/'/>);  
    }
};

export default PrivateRouteCustomer;