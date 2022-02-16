import React from 'react';
import { useNavigate } from 'react-router-dom';
function NotFound(props){
    let history = useNavigate();
    setTimeout(() => {
        history.push('/');
    }, 3000);
    return(
        <div className='container-fluid' style={{'backgroundColor':'#D3D3D3','height':'100vh'}}>
            <div className='row' style={{'height':'100vh'}}>
                <div className='col' />
                <div className='col align-self-center'>
                    <h1>404: Not Found Navigateing you to home.</h1>
                    
                </div>
                <div className='col'/>
            </div>
        </div>
    );
}
export default NotFound;