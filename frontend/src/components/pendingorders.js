import axios from 'axios';
import React, { useEffect } from 'react';
import Loadingspinner from './Loadingspinner';
import Showprescription from './Showprescription';
import Alert from './Alert';
import Trackinginput from './Trackinginput';
import { useDispatch, useSelector } from 'react-redux';
import { getPending, setdelivery } from '../slices/order/orderSlice';
export default function Pendingorders(props){
	const dispatch = useDispatch();
	const {awb, delivery_partner, fetched, orders, errorMessage} = useSelector(state => state.order);
	const submit = ({productid,transactionid},e) =>{
		e.preventDefault();
		if(awb!=='' && delivery_partner!==''){
			dispatch(setdelivery({'productid' : productid, 'transactionid':transactionid}))
		}
	}
	useEffect(()=>{
		dispatch(getPending());
		// eslint-disable-next-line
	},[])
	if(fetched === 'loading'){
		return (<Loadingspinner/>);	
	}else{
		return (
			<div>
				{orders.length !==0 ?
					<div className='table-responsive'>
						<center><h1 className="display-6">Pending Orders</h1></center>
						<table className='table table-striped'>
							<thead>
								<tr>
									<th>Product Name</th>
									<th>Lens Details</th>
									<th>Client Name</th>
									<th>Quantity</th>
									<th>delivery Address</th>
									<th>&nbsp;</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((order)=>{
									return(
										<tr>
											<td>{order['products']['productname']}</td>
											<td><Showprescription lens={order['products']['lens_details']}/></td>
											<td>{order['clientname']}</td>
											<td>{order['products']['quantity']}</td>
											<td>{order['deliveryaddress']}</td>
											<td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Set delivery</button></td>
											<Trackinginput id="exampleModal" product_id={order['products']['_id']} _id={order['_id']} handleSubmit={submit}/>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				:<Alert message={errorMessage} type='danger'/>}
			</div>
		);
	}
}