import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Registercustomer from './Registercustomer';
import Login from './Login';
export default function Logincontainer(){
    const {isAuthenticated, userType } = useSelector(state => state.authentication);
    if(isAuthenticated === true ){
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