import React, { useEffect, useRef } from 'react';
import './Homestyles.css';
import { Link , Redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loadingspinner from './Loadingspinner';

function Home(){
	const fetched = useRef(false);
	const {isAuthenticated, userType} = useSelector(state => state.authentication);
	useEffect(()=>{
		fetched.current=true;
	},[])
	if(fetched.current===false){
		return(<Loadingspinner/>);
	}else if(isAuthenticated===true && userType==='seller'){
        return (<Redirect to='/insertproduct'/>); 
    }else{
		return (
			<div className='container-fluid'>
				<div className="row justify-content-start">
					<div className="col-sm">
						<Link to="/product/contact_lens/1"><img src={"/images/contact-lenses.jpg"} alt='contact lens' className="gallery"/></Link>
						<br/>
					</div>
					<div className="col-sm">
						<Link to="/product/sunglasses/1"><img src={"/images/sunglasses.jpg"} alt='sunglasses' className="gallery"/></Link>
						<br/>
					</div>
					<div className="col-sm">
						<Link to="/product/spectacles/1"><img src={"/images/spectacles.jpg"} alt='spectacles' className="gallery"/></Link>
						<br/>
					</div>
				</div>
			</div>
		);
	}
}

export default Home;
