import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {setValue, userAuth } from '../slices/authentication/authenticationSlice';
import Alert from './Alert';

export default function Login(props){
    const dispatch = useDispatch();
    const {loginerror} = useSelector(state => state.authentication);
    
    const submitValueLog = (e) => {
        e.preventDefault();
        dispatch(userAuth()).then(()=>{return(<Redirect to='/'/>)});
    }
    return(
        <div className='col-sm'>
            <h1 className='lead' style={{'fontSize':'1.5rem'}}>Login to your account</h1>
            <form onSubmit={submitValueLog}>
                <input className='form-control' placeholder='Username' id='username' type='text' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} name='loginUsername'/><br/>
                <input className='form-control' placeholder='Password' id='password' type='password' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} name='loginPassword' required/><br/>
                <br/>
                <div className='form-check form-check-inline'>
                    <input type='radio' className='form-check-input' name='typeofuser' id='customer' value='customer' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/>
                    <label htmlFor='customer' className='form-check-label' style={{'color':'#000000'}}>Customer</label>
                </div>
                <div className='form-check form-check-inline'>
                    <input type='radio' className='form-check-input' name='typeofuser' value='seller' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/>
                    <label htmlFor='seller' className='form-check-label' style={{'color':'#000000'}}>Seller</label>
                </div>
                {loginerror !== '' ?<Alert message={loginerror} type='danger'/>:null}
                <br/><button tag='input' type='submit' className='btn btn-primary'>Submit</button>
            </form>
        </div>
    )
}