import React, { useEffect } from 'react';
import Loadingspinner from './Loadingspinner';
import Showprescription from './Showprescription';
import Alert from './alert';
import {useDispatch, useSelector} from 'react-redux';
import { getAll } from '../slices/order/orderSlice';
export default function Recievedorders(props){
	const dispatch = useDispatch();
	const {orders, errorMessage, fetched} = useSelector(state => state.order);
	useEffect(()=>{
		dispatch(getAll);
		// eslint-disable-next-line
	},[])
	if(fetched==='loading'){
		return (<Loadingspinner/>);	
	}else{
		return (
			<div>
			{orders.length !==0 ?
					<div className='table-responsive'>
						<center><h1 className="display-6">Recieved orders</h1></center>
						<table className='table table-striped'>
							<thead>
								<tr>
									<th>Product Name</th>
									<th>Lens Details</th>
									<th>Client Name</th>
									<th>Quantity</th>
									<th>delivery Address</th>
								</tr>
							</thead>
							<tbody>
								{this.state.orders.map((order)=>{
									return(
										<tr key={order['_id']}>
											<td>{order['products']['productname']}</td>
											<td><Showprescription lens={order['products']['lens_details']}/></td>
											<td>{order['clientname']}</td>
											<td>{order['products']['quantity']}</td>
											<td>{order['deliveryaddress']}</td>
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