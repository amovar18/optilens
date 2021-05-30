import React, { useState }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from './alert';
function Login(){
    
    //for user registration
    const [name,setname]=useState('');
    const [address,setaddress]=useState('');
    const [regemail,setemail]=useState('');
    const [regpassword,setregpassword]=useState('');
    const [confirmpassword,setconfirmpassword]=useState('');
    const [regusername,setregusername]=useState('');
    const [phone,setphone]=useState('');
    
    const submitValueRegister = () => {
        if (typeof regpassword !== "undefined" && typeof confirmpassword !== "undefined") {  
            if (regpassword !== confirmpassword) {
              document.getElementById('error').style.display="Visible";
            }
        }else{
            document.getElementById('error').style.display="none";
            axios({
                method: 'POST',
                url: 'http://localhost:5000/user/login',
                data: {
                    'name' : name,
                    'username' : regusername,
                    'phone' : phone,
                    'email' : regemail,
                    'password' : regpassword,
                    'address': address
                }
              });
        }
    }
    // for login
    const [logusername,setlogusername]=useState('');
    const [logpassword,setlogpassword]=useState('');
    const [typeofuser,settypeofuser]=useState('Customer');
    const [error,seterror]=useState('');
    const submitValueLog = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: 'http://localhost:5000/auth/signin',
            withCredentials: true,
            data: {
                'username' : logusername,
                'password' : logpassword,
                'typeofuser':typeofuser
            }
          }).then((response) => {
                window.location='http://localhost:3000/';
          }, (error) => {
                if(error.response.status===404){
                    seterror('Username or password is wrong');
                }
          });
    }
    return (
        <div style={{'height':'100%'}}>
            <div className='container'>
                <div className='row align-items-center'>
                    <div className='col-sm'>
                        <h2 style={{'color':'#ffffff'}}>Login to your account</h2>
                        <form onSubmit={submitValueLog}>
                            <input className='form-control' placeholder='Username' id='username' type='text' onChange={e => setlogusername(e.target.value)}/><br/>
                            <input className='form-control' placeholder='Password' id='password' type='password' onChange={e => setlogpassword(e.target.value)} required/><br/>
                            <br/>
                            <div className='form-check form-check-inline'>
                                <input type='radio' className='form-check-input' name='typeofuser' id='customer' value='customer' onChange={e => settypeofuser(e.target.value)}/>
                                <label htmlFor='customer' className='form-check-label' style={{'color':'#000000'}}>Customer</label>
                            </div>
                            <div className='form-check form-check-inline'>
                                <input type='radio' className='form-check-input' name='typeofuser' value='seller' onChange={e => settypeofuser(e.target.value)}/>
                                <label htmlFor='seller' className='form-check-label' style={{'color':'#000000'}}>Seller</label>
                            </div>
                            {error === ''?null:<Alert message={error} type='danger'/>}
                            <a href="/forgotpassword">Forgot Password?</a><br/>
                            <br/><button tag='input' type='submit' className='btn btn-primary'>Submit</button>
                        </form>
                    </div>
                    <div className='col-sm text-center'>
                        <h2 style={{'color':'#000000'}}>OR</h2>
                    </div><br/>
                    <div className='col-sm'>
                        <h2 style={{'color':'#000000'}}>New User Signup!</h2>
                        <form onSubmit={submitValueRegister}>
                            <input type="text" className='form-control' placeholder="Name" onChange={e => setname(e.target.value)} required/><br/>
                            <input type="email" className='form-control' placeholder="Email"  onChange={e => setemail(e.target.value)} required/><br/>
                            <input type="text" className='form-control' placeholder="Username" onChange={e => setregusername(e.target.value)} required/><br/>
                            <input type="password" className='form-control' placeholder="Password" onChange={e => setregpassword(e.target.value)} required/><br/>
                            <input type="password" className='form-control' placeholder="Confirm Password" onChange={e => setconfirmpassword(e.target.value)} required/><br/>
                            <input type="tel" className='form-control' placeholder="Phone" onChange={e => setphone(e.target.value)} required/><br/>
                            <input as="textarea" className='form-control' placeholder="Address" onChange={e => setaddress(e.target.value)}/><br/>
                            <small><Link to="/registerseller">Want to sell with us ?</Link></small><br/><br/>
                            <button type='submit' className='btn btn-primary'>Signup</button>
                        </form>
                    </div>
                </div>
            </div>       
        </div>             
    );
}
export default Login;