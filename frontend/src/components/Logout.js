import React,{ useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import {userDeauth} from '../slices/authentication/authenticationSlice'
import Loadingspinner from './Loadingspinner';
function Logout(){
    const {isAuthenticated} = useSelector(state => state.authentication); 
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(userDeauth());
        // eslint-disable-next-line
    },[isAuthenticated]);

    if(isAuthenticated === true){
        return(<Loadingspinner/>)
    }else if( isAuthenticated===false){
        return(<Navigate to='/'/>);
    }
      
  }


export default Logout;
