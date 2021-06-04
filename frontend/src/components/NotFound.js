import React, { useEffect, useRef } from 'react';
import { Redirect } from 'react-router';
export default function NotFound(){
    const redirect = useRef(false);
    useEffect(()=>{
        setTimeout(() => {
            redirect.current=true
        },2000);
    },[])
    return(
        <div className='container-fluid' style={{'backgroundColor':'#D3D3D3','height':'100vh'}}>
            <div className='row' style={{'height':'100vh'}}>
                <div className='col' />
                <div className='col align-self-center'>
                    <h1>404: Not Found Redirecting you to home.</h1>
                    {redirect.current===true?<Redirect to='/'/>:null}
                </div>
                <div className='col'/>
            </div>
        </div>
    );
}