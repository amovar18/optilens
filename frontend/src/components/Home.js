import React from 'react';
import './Homestyles.css';
import contacts from '../images/contact-lenses.jpg';
import sunglasses from '../images/sunglasses.jpg';
import spectacles from '../images/spectacles.jpg';
import { Link } from 'react-router-dom';

function Home(){
	return (
		<div>
			<div className="row justify-content-start">
				<div className="col-sm">
					<Link to="/product/contact_lens/1"><img src={contacts} alt='contact lens' className="gallery"/></Link>
					<br/>
				</div>
				<div className="col-sm">
					<Link to="/product/sunglasses/1"><img src={sunglasses} alt='sunglasses' className="gallery"/></Link>
					<br/>
				</div>
				<div className="col-sm">
					<Link to="/product/spectacles/1"><img src={spectacles} alt='spectacles' className="gallery"/></Link>
					<br/>
				</div>
			</div>
		</div>
	);
}

export default Home;
