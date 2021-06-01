import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from './alert';
import { useDispatch, useSelector } from 'react-redux';
import {setPassword,setUser,setUsername,setRegistrationAddress,setRegistrationName,setRegistrationEmail,setRegistrationPassword,setRegistrationUsername,setRegistrationPhone, setRegistrationConfirmPassword, userAuth, customer, createCustomer} from '../slices/authentication/authenticationSlice';
import store from '../store';
function Login(){
    const dispatch = useDispatch();
    const {isAuthenticated , error, criteriaerror, passwordMatch, availability, registrationError} = useSelector(state => state.authentication);
    const submitValueRegister = (e) => {
        e.preventDefault();
        if(availability===true && criteriaerror===false && passwordMatch===false){
            dispatch(createCustomer());
        }
    }
    const submitValueLog = (e) => {
        e.preventDefault();
        dispatch(userAuth(store))
    }
    if(isAuthenticated===true){
        return(<Redirect to='/'/>);
    }else{
        return (
            <div style={{'height':'100%'}}>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-sm'>
                            <h1 className='display-6'>Login to your account</h1>
                            <form onSubmit={submitValueLog}>
                                <input className='form-control' placeholder='Username' id='username' type='text' onChange={e => dispatch(setUsername(e.target.value))}/><br/>
                                <input className='form-control' placeholder='Password' id='password' type='password' onChange={e => dispatch(setPassword(e.target.value))} required/><br/>
                                <br/>
                                <div className='form-check form-check-inline'>
                                    <input type='radio' className='form-check-input' name='typeofuser' id='customer' value='customer' onChange={e => dispatch(setUser(e.target.value))}/>
                                    <label htmlFor='customer' className='form-check-label' style={{'color':'#000000'}}>Customer</label>
                                </div>
                                <div className='form-check form-check-inline'>
                                    <input type='radio' className='form-check-input' name='typeofuser' value='seller' onChange={e => dispatch(setUser(e.target.value))}/>
                                    <label htmlFor='seller' className='form-check-label' style={{'color':'#000000'}}>Seller</label>
                                </div>
                                {error === true ?<Alert message='username or password is wrong' type='danger'/>:null}
                                <br/><button tag='input' type='submit' className='btn btn-primary'>Submit</button>
                            </form>
                        </div>
                        <div className='col-sm text-center'>
                            <h1 className='display-6'>OR</h1>
                        </div><br/>
                        <div className='col-sm'>
                            <h1 className='display-6'>New User Signup!</h1>
                            <form onSubmit={e =>submitValueRegister(e)}>
                                <input type="text" className='form-control' placeholder="Name" onChange={e => dispatch(setRegistrationName(e.target.value))} required/><br/>
                                <input type="email" className='form-control' placeholder="Email"  onChange={e => dispatch(setRegistrationEmail(e.target.value))} required/><br/>
                                <input type="text" className='form-control' placeholder="Username" onChange={e => dispatch(setRegistrationUsername(e.target.value))} required/><br/><button onClick={checkabailability} className='btn btn-primary'>Check availability</button>
                                {availability===true ? <Alert message='Username available' type='success'/>: availability === false ? <Alert message='Username not available' type='danger'/> :null}
                                <br/>
                                <input type="password" className='form-control' placeholder="Password" onChange={e => dispatch(setRegistrationPassword(e.target.value))} required/><br/>
                                {criteriaerror === true ? <Alert message='Passwords do not match criteria' type='danger'/>:criteriaerror === false? <Alert message='Passwords match criteria' type='success'/> :null}
                                <input type="password" className='form-control' placeholder="Confirm Password" onChange={e => dispatch(setRegistrationConfirmPassword(e.target.value))} required/><br/>
                                {passwordMatch === true ? <Alert message='Passwords do not match' type='danger'/>:passwordMatch === false? <Alert message='Passwords match' type='success'/> :null}
                                <input type="tel" className='form-control' placeholder="Phone" onChange={e => dispatch(setRegistrationPhone(e.target.value))} required/><br/>
                                <textarea className='form-control' placeholder="Address" onChange={e => dispatch(setRegistrationAddress(e.target.value))}></textarea><br/>
                                <small><Link to="/registerseller">Want to sell with us ?</Link></small><br/><br/>
                                {registrationError!==''?<Alert message='Internal server error' type='danger'/>:null}
                                <button type='submit' className='btn btn-primary'>Signup</button>
                            </form>
                        </div>
                    </div>
                </div>       
            </div>             
        );
    }
}
export default Login;