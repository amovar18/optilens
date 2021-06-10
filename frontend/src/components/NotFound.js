import React from 'react';
import history from '../history';
export default function NotFound(){
    return(
        <div className='container-fluid' style={{'backgroundColor':'#D3D3D3','height':'100vh'}}>
            <div className='row' style={{'height':'100vh'}}>
                <div className='col' />
                <div className='col align-self-center'>
                    <h1>404: Not Found Redirecting you to home.</h1>
                    {setTimeout(() => {
                        history.push('/');
                    }, 3000)}
                </div>
                <div className='col'/>
            </div>
        </div>
    );
}