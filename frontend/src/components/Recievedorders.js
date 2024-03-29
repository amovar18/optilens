import React, { useEffect } from 'react';
import Loadingspinner from './Loadingspinner';
import Showprescription from './Showprescription';
import {useDispatch, useSelector} from 'react-redux';
import { getAll } from '../slices/order/orderSlice';
export default function Recievedorders(props){
	const dispatch = useDispatch();
	const {orders, errorMessage, allOrderFetched} = useSelector(state => state.order);
	useEffect(()=>{
		dispatch(getAll());
		// eslint-disable-next-line
	},[])
	if(allOrderFetched==='loading'){
		return (<Loadingspinner/>);	
	}else if(allOrderFetched === true){
		if(errorMessage===''){
			if(orders.length!==0){
				return (
					<div>
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
											<tr key={order['_id']}>
												<td>{order['products']['productName']}</td>
												<td><Showprescription lens={order['products']['lens_details']}/></td>
												<td>{order['clientName']}</td>
												<td>{order['products']['quantity']}</td>
												<td>{order['deliveryAddress']}</td>
											</tr>
										);
									})}
								</tbody>
							</table>
						</div>
					</div>
				);
			}else{
				return(
					<div className='container-fluid' style={{'backgroundColor':'#D3D3D3','height':'100vh'}}>
			            <div className='row' style={{'height':'100vh'}}>
        		        	<div className='col align-self-center'>
	        		            <center><h1>OOPS!! You havent received any orders</h1></center>
    	        			</div>
	            		</div>
    	    		</div>
				);
			}
		}
	}
}