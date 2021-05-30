import axios from 'axios';
import React,{ useEffect, useState } from 'react';
import Loadingspinner from './Loadingspinner';
function Logout(){
    const [loggedout,setloggedout]=useState('loading');
    useEffect(()=>{
        axios({
            method: 'GET',
            url: 'http://localhost:5000/auth/signout',
            withCredentials: true,
        }).then((response) => {
            setloggedout(true);
        }, (error) => {
            setloggedout(false);
        });
    },[]);
    if(loggedout==='loading'){
        return(<Loadingspinner/>);
    }else if(loggedout===false){
        return(<div>{window.location='http://localhost:3000/'}</div>);
    }else{
        return(<div>{window.location='http://localhost:3000/login'}</div>);
    }
      
  }


export default Logout;
