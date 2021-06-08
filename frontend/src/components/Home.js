import React from 'react';
import './Homestyles.css';
import { Link } from 'react-router-dom';

function Home(){
	return (
		<div>
			<div className="row justify-content-start">
				<div className="col-sm">
					<Link to="/product/contact_lens/1"><img src={"/contact-lenses.jpg"} alt='contact lens' className="gallery"/></Link>
					<br/>
				</div>
				<div className="col-sm">
					<Link to="/product/sunglasses/1"><img src={"/sunglasses.jpg"} alt='sunglasses' className="gallery"/></Link>
					<br/>
				</div>
				<div className="col-sm">
					<Link to="/product/spectacles/1"><img src={"/spectacles.jpg"} alt='spectacles' className="gallery"/></Link>
					<br/>
				</div>
			</div>
		</div>
	);
}

export default Home;
