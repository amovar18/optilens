import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './Login';
export default function Logincontainer(){
    const {isAuthenticated } = useSelector(state => state.authentication);
    if(isAuthenticated === true ){
        return(<Navigate to='/'/>);
    }else if(isAuthenticated === false){
        return (
            <div style={{'height':'100%'}}>
                <div className='container'>
                    <div className='row align-items-center text-center'>
                        <div className='col-sm'>
                            <Login/>
                        </div>
                    </div>
                </div>       
            </div>             
        );
    }
}