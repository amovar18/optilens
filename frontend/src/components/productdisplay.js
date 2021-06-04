import React, { useEffect } from 'react';
import Enterprescription from './enterprescription';
import Carousel from './carousel';
import Alert from './alert';
import { useDispatch, useSelector } from 'react-redux';
import { cartAdd } from '../slices/cart/cartSlice';
import { productGetSingle } from '../slices/product/productSlice';
export default function ProductDisplay(props){
	const dispatch = useDispatch();
	const {singleProduct, shopname} = useSelector(state => state.product);
	const { errormessage} = useSelector(state => state.cart);
	const submit = (event) =>{
		dispatch(cartAdd(props.match.params.productId));
	}
	useEffect(()=>{
		dispatch(productGetSingle(props.match.params.productId));	
		// eslint-disable-next-line
	},[]);
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
				</div>
			</div>:null}
		</div>
	);
}
