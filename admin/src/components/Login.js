import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import {setValue, userAuth } from '../slices/authentication/authenticationSlice';
import Alert from './Alert';

export default function Login(props){
    const dispatch = useDispatch();
    const {isAuthenticated , loginerror} = useSelector(state => state.authentication);
    
    const submitValueLog = (e) => {
        e.preventDefault();
        dispatch(userAuth());
    }
    if(isAuthenticated === true){
        return(<Navigate to='/'/>);
    }else{
        return(
            <div className='container-fluid'>
                <h1 className='lead' style={{'fontSize':'1.5rem'}}>Login to your account</h1>
                <form onSubmit={submitValueLog}>
                    <input className='form-control' placeholder='Username' id='username' type='text' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} name='loginUsername'/><br/>
                    <input className='form-control' placeholder='Password' id='password' type='password' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} name='loginPassword' required/><br/>
                    <br/>
                    {loginerror !== '' ?<Alert message={loginerror} type='danger'/>:null}
                    <br/><button tag='input' type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        )
    }
}