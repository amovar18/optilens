import React, { useEffect } from 'react';
import Showprescription from './Showprescription';
import { Link, Navigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Loadingspinner from './Loadingspinner';
import {cartGet, cartDelete, checkout, setValue} from '../slices/cart/cartSlice';
export function Cart(props){
	const dispatch= useDispatch();
	const {fetched,cart,inserted,name,city,state,pincode,addressLine1,addressLine2,area,totalPrice} = useSelector(state => state.cart);
	const checkoutLocal = (e) =>{
		e.preventDefault();
		dispatch(checkout());
	}
	const deleteFromCart= (e) =>{
		e.preventDefault();
		dispatch(cartDelete(e.target.value))
	}
	useEffect(()=>{
		dispatch(cartGet());
		// eslint-disable-next-line
	},[])
	if(inserted===true){
		return(<Navigate to='/yorders'/>);
	}else if(fetched === false){
		return(<Loadingspinner/>);
	}else{
		if(cart.length!==0){
			return (
				<div className='table-responsive'>
					<h1 className="display-6">Cart</h1>
					<table className='table table-striped'>
						<thead>
							<tr>
								<th>
									Product name
								</th>
								<th>
									Quantity
								</th>
								<th>
									Price
								</th>
								<th>
									Lens Details
								</th>
								<th>
									Total Price
								</th>
								<th>&nbsp;</th>
							</tr>
						</thead>
						<tbody>
							{cart.map((e) => (
								<tr>
									<td>
										<Link to={"/productdisplay/"+e._id}>{e.productName}</Link>
									</td>
									<td>
										{e.quantity}
									</td>
									<td>
										{e.price}
									</td>
									<td>
										<Showprescription lens={e.lens_details}/>
									</td>
									<td>
										{parseInt(e.price)*e.quantity}
									</td>
									<td>
										<button className='btn btn-danger' value={e._id} onClick={deleteFromCart} type='submit' id="delete">Delete</button>
									</td>
								</tr>
							))}
							<tr>
								<td colSpan='4'>
									Total Price =
								</td>
								<td colSpan='2'>
									{totalPrice}
								</td>
							</tr>
							<tr>
								<td colSpan='4'>
									Client Name
								</td>
								<td colSpan='2'>
									<input className='form-control' name='name' placeholder='Client Name' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} value={name}/>
								</td>
							</tr>
							<tr>
								<td colSpan='4'>
									Delivery Address
								</td>
								<td colSpan='2'>
								<input className='form-control' name='addressLine1' placeholder='Address line 1' onChange={e => dispatch(setValue({name:e.target.name,value:e.target.value}))} value={addressLine1}/>
								<input className='form-control' name='addressLine2' placeholder='Address line 2' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} value={addressLine2}/>
								<input className='form-control' name='area' placeholder='Area' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} value={area}/>
								<input className='form-control' name='city' placeholder='City' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} value={city}/>
								<input className='form-control' name='pincode' placeholder='Pincode' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} value={pincode}/>
								<input className='form-control' name='state' placeholder='State' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} value={state}/>
								</td>
							</tr>
							
							<tr>
								<td colSpan='4'></td>
								<td colSpan='2'>
									<button className='btn btn-primary' onClick={checkoutLocal} type='submit'>Proceed</button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			);
		}else{
			return(
				<div style={{'height':'100vh'}}className="border d-flex align-items-center justify-content-center">
					<h1>Oops no items in cart!!!!</h1>
    			</div>
			);
		}
	}
}
export default Cart;