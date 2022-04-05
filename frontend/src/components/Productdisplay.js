import React, { useEffect, useRef } from 'react';
import Enterprescription from './Enterprescription';
import Carousel from './Carousel';
import Alert from './Alert';
import { useDispatch, useSelector } from 'react-redux';
import { cartAdd } from '../slices/cart/cartSlice';
import { productGetSingle } from '../slices/product/productSlice';
import Loadingspinner from './Loadingspinner';
import {Navigate, useParams} from 'react-router-dom';
export default function Productdisplay(props){
	const params = useParams();
	const dispatch = useDispatch();
	const {singleProduct, shopname} = useSelector(state => state.product);
	const {isAuthenticated, userType} = useSelector(state => state.authentication);
	const {errormessage, successMessage} = useSelector(state => state.cart);
	const fetched = useRef(false);
	const submit = (event) =>{
		dispatch(cartAdd(params.productId));
	}
	useEffect(()=>{
		dispatch(productGetSingle(params.productId));	
		fetched.current=true;
		// eslint-disable-next-line
	},[]);
	if(fetched.current===false){
		return(<Loadingspinner/>);
	}else if(isAuthenticated===true && userType==='seller'){
        return (<Navigate to='/insertproduct'/>); 
    }else{
		return (
			<div className='container'>
				{singleProduct.length!==0 && shopname.length!==0?
				<div className='row justify-contents-start'>
					<div className='col-sm align-self-center'>
						<Carousel images={singleProduct['image']}/>
					</div>
					<div className='col-sm'>
						<div>
							<small className='text-muted'><h1 className='display-6'>{singleProduct['productname']}</h1></small> 
						</div>	
						<div>
							<h6>Brand: <small className='text-muted'>{singleProduct['brand']}</small></h6>
						</div>
						<div>
							<h6>Sold by: <small className='text-muted'>{shopname['shopname']}</small></h6>
						</div>
						<div>
							<h6>Price: <small className='text-muted'>{singleProduct['price']}</small></h6>
						</div>	
						<div>
							<h6>{singleProduct['productdescription']}</h6>
						</div>
						<Enterprescription handleSubmit={submit}/>	
						{errormessage!==''?<Alert message={errormessage} type='danger'/>:null}
						{successMessage!==''?<Alert message={successMessage} type='success'/>:null}
					</div>
				</div>:null}
			</div>
		);
	}
}
