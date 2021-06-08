import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loadingspinner from './Loadingspinner';
import Registercustomer from './Registercustomer';
import Login from './Login';
export default function Logincontainer(){
    const fetched = useRef(false);
    const {isAuthenticated, userType } = useSelector(state => state.authentication);
    useEffect(()=>{
        fetched.current=true;
    },[])
    if(fetched.current===false){
        return(<div><Loadingspinner/><h1>Login</h1></div>);
    }else if(isAuthenticated === true ){
        return(<Redirect to='/'/>);
    }else if(isAuthenticated === false && userType === ''){
        return (
            <div style={{'height':'100%'}}>
                <div className='container'>
                    <div className='row align-items-center text-center'>
                        <div className='col-sm'>
                            <Login/>
                        </div>
                        <div className='col-sm text-center'>
                            <h1 className='display-6'>OR</h1>
                        </div><br/>
                        <div className='col-sm text-center'>
                            <Registercustomer/>    
                        </div>
                        
                    </div>
                </div>       
            </div>             
        );
    }
}