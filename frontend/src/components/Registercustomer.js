import React from 'react';
import { Link } from 'react-router-dom';
import Alert from './Alert';
import { useDispatch, useSelector } from 'react-redux';
import {setpasswordMatch,setValue, createCustomer, checkUsernameAvailability, setcriteriaError} from '../slices/authentication/authenticationSlice';
export default function Registercustomer(){
    const dispatch = useDispatch();
    const {criteriaError, passwordMatch, availability, registrationError, Registration_password, Registration_confirm_password} = useSelector(state => state.authentication);
    const checkpasswordstrength = () =>{
        if(Registration_password!==''){
            let regex=RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if(regex.test(Registration_password)===true){
                dispatch(setcriteriaError(false));
            }else{
                dispatch(setcriteriaError(true));
            }
        }
    }
    const checkpasswords = () =>{
        if (Registration_password !== undefined && Registration_confirm_password !== undefined) {  
            if (Registration_password !== Registration_confirm_password) {
                dispatch(setpasswordMatch(true));
            }else{
                dispatch(setpasswordMatch(false));
            }
        }
    }
    const checkavailability =(e) =>{
        e.preventDefault();
        dispatch(checkUsernameAvailability());
    }
    const submitValueRegister = (e) => {
        e.preventDefault();
        if(availability===true && criteriaError===false && passwordMatch===false){
            dispatch(createCustomer());
        }
    }
    return (
        <div style={{'height':'100%'}}>
            <div className='container-fluid'>
                <div className='row align-items-center'>                        
                    <div className='col-sm'>
                        <h1 className='lead' style={{'fontSize':'1.5rem'}}>New User Signup!</h1>
                        <form onSubmit={e =>submitValueRegister(e)}>
                            <div className="input-group mb-3">
                                <input type="text" aria-label="Recipient's username" aria-describedby="button-check" className='form-control' placeholder="Username" onChange={e =>  dispatch(setValue({name:e.target.name, value:e.target.value}))} name='Registration_username' required/><br/>
                                <button className="btn btn-primary" type="submit" id="button-check" onClick={checkavailability} >check</button>
                                {availability===true ? <Alert message='Username available' type='success'/>: availability === false ? <Alert message='Username not available' type='danger'/> : null}
                            </div>
                            <input type="text" className='form-control' placeholder="Name" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} name="Registration_name" required/><br/>
                            <input type="email" className='form-control' placeholder="Email"  onChange={e =>  dispatch(setValue({name:e.target.name, value:e.target.value}))} name='Registration_email' required/><br/>
                            <br/>
                            <input type="password" className='form-control' placeholder="Password" onChange={e =>  dispatch(setValue({name:e.target.name, value:e.target.value}))} onKeyUp={checkpasswordstrength} name='Registration_password' required/><br/>
                            {criteriaError === true ? <Alert message='Passwords do not match criteria' type='danger'/>:criteriaError === false? <Alert message='Passwords match criteria' type='success'/> :null}
                            <input type="password" className='form-control' placeholder="Confirm Password" onChange={e =>  dispatch(setValue({name:e.target.name, value:e.target.value}))} onKeyUp={checkpasswords} name='Registration_confirm_password' required/><br/>
                            {passwordMatch === true ? <Alert message='Passwords do not match' type='danger'/>:passwordMatch === false? <Alert message='Passwords match' type='success'/> :null}
                            <input type="tel" className='form-control' placeholder="Phone" onChange={e =>  dispatch(setValue({name:e.target.name, value:e.target.value}))} required name='Registration_phone'/><br/>
                            <textarea className='form-control' placeholder="Address" onChange={e =>  dispatch(setValue({name:e.target.name, value:e.target.value}))} name='Registration_address'></textarea><br/>
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