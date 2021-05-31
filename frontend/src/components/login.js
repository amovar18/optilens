import React, { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Alert from './alert';
import Loadingspinner from './Loadingspinner';
function Login(){
    const [status,setloggedstatus]=useState('');
    const [criteriaerror,setcriteriaerror] = useState('');
    const [passwordmatch,setpasswordmatcherror] = useState('');
    const [loginerror,setloginerror]=useState('');
    const [registererror,setregistererror]=useState('');

    //for user registration
    const [name,setname]=useState('');
    const [address,setaddress]=useState('');
    const [regemail,setemail]=useState('');
    const [regpassword,setregpassword]=useState('');
    const [confirmpassword,setconfirmpassword]=useState('');
    const [regusername,setregusername]=useState('');
    const [phone,setphone]=useState('');
    const [availability,setavailability]=useState('');

    const checkpasswordstrength = () =>{
        if(regpassword!==''){
            let regex=RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if(regex.test(regpassword)===true){
                setcriteriaerror(false);
            }else{
                setcriteriaerror(true);
            }
        }
    }
    const checkpasswords = () =>{
        if (regpassword !== undefined && confirmpassword !== undefined) {  
            if (regpassword !== confirmpassword) {
                setpasswordmatcherror(true);
            }else{
                setpasswordmatcherror(false);
            }
        }
    }
    const checkabailability=()=>{
        if(regusername!==''){
            axios({
                method: 'GET',
                url: 'http://localhost:5000/user/availability'+regusername,
            }).then((response)=>{
                setavailability(response.data);
            }).catch((error)=>{
                console.log(error);
            });
        }
    }
    useEffect(()=>{
        axios({
            method: 'GET',
            url: 'http://localhost:5000/auth/getstatus',
        }).then((response)=>{
            setloggedstatus(true);
        }).catch((error)=>{
            setloggedstatus(false);
        });
    },[]);
    const submitValueRegister = () => {
        if(availability===true && criteriaerror===false && passwordmatch===false){
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
            }).then((response)=>{
                window.location='http://localhost:3000/';
            }).catch((error)=>{
                if(error!==undefined){
                    if(error.response.status===500){
                        setregistererror(true);
                    }
                }
            });
        }
    }
    // for login
    const [logusername,setlogusername]=useState('');
    const [logpassword,setlogpassword]=useState('');
    const [typeofuser,settypeofuser]=useState('Customer');
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
                    setloginerror('Username or password is wrong');
                }
          });
    }
    if(status===''){
        return(<Loadingspinner/>);
    }else if(status===true){
        return(window.location='http://localhost:3000/');
    }else{
        return (
            <div style={{'height':'100%'}}>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-sm'>
                            <h1 className='display-6'>Login to your account</h1>
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
                                {loginerror === ''?null:<Alert message={loginerror} type='danger'/>}
                                <a href="/forgotpassword">Forgot Password?</a><br/>
                                <br/><button tag='input' type='submit' className='btn btn-primary'>Submit</button>
                            </form>
                        </div>
                        <div className='col-sm text-center'>
                            <h2 style={{'color':'#000000'}}>OR</h2>
                        </div><br/>
                        <div className='col-sm'>
                            <h1 className='display-6'>New User Signup!</h1>
                            <form onSubmit={submitValueRegister}>
                                <input type="text" className='form-control' placeholder="Name" onChange={e => setname(e.target.value)} required/><br/>
                                <input type="email" className='form-control' placeholder="Email"  onChange={e => setemail(e.target.value)} required/><br/>
                                <input type="text" className='form-control' placeholder="Username" onChange={e => setregusername(e.target.value)} required/><br/><button onClick={checkabailability} className='btn btn-primary'>Check availability</button>
                                {availability===true ? <Alert message='Username available' type='success'/>: availability === false ? <Alert message='Username not available' type='danger'/> :null}
                                <br/>
                                <input type="password" className='form-control' placeholder="Password" onChange={e => setregpassword(e.target.value)} onKeyUp={checkpasswordstrength} required/><br/>
                                {criteriaerror === true ? <Alert message='Passwords do not match criteria' type='danger'/>:criteriaerror === false? <Alert message='Passwords match criteria' type='success'/> :null}
                                <input type="password" className='form-control' placeholder="Confirm Password" onChange={e => setconfirmpassword(e.target.value)} onKeyUp={checkpasswords} required/><br/>
                                {passwordmatch === true ? <Alert message='Passwords do not match' type='danger'/>:passwordmatch === false? <Alert message='Passwords match' type='success'/> :null}
                                <input type="tel" className='form-control' placeholder="Phone" onChange={e => setphone(e.target.value)} required/><br/>
                                <input as="textarea" className='form-control' placeholder="Address" onChange={e => setaddress(e.target.value)}/><br/>
                                <small><Link to="/registerseller">Want to sell with us ?</Link></small><br/><br/>
                                {registererror!==''?<Alert message='Internal server error' type='danger'/>:null}
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