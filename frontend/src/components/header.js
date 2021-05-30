import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
function Header(){
	const [links,setLinks]=useState([]);
	useEffect(()=>{
		axios({
			method:'GET',
			url:'http://localhost:5000/auth/getlinks',
			withCredentials:true
		}).then((response)=>{
			setLinks(response.data);
		}).catch((error)=>{
			setLinks([]);
		})
	},[]);
    return (
		<nav className='navbar navbar-expand-lg navbar-light' style={{'backgroundColor':'#B0E0E6'}}>
            <div className='container-fluid'>
                <a className='navbar-brand' style={{'color':'#C71585'}} href='/'>Opticonnect</a>
				<button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarToggler' aria-controls='navbarToggler' aria-expanded='false' aria-label='Toggle navigation'>
      				<span className='navbar-toggler-icon'></span>
    			</button>
                <div className='collapse navbar-collapse' id='navbarToggler'>
					<div className='ms-auto p-2 bd-highlight'>
                    	<ul className='navbar-nav mb-2 mb-lg-0'>
							{links.length !== 0 ? links.map(({title,path})=>(
								<li className='nav-item' key={title}>
									<a className='nav-link' style={{'color':'#750D37'}} aria-current='page' href={path}>
										{title}
									</a>
								</li>
							)):null}
                	    </ul>
					</div>
                </div>
            </div>
        </nav>
    );
  }


export default Header;
