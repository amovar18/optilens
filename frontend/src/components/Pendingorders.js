import React, { useEffect } from 'react';
import Loadingspinner from './Loadingspinner';
import Showprescription from './Showprescription';
import Trackinginput from './Trackinginput';
import { useDispatch, useSelector } from 'react-redux';
import { getPending, setdelivery } from '../slices/order/orderSlice';
export default function Pendingorders(props){
	const dispatch = useDispatch();
	const {awb, deliveryPartner, pendingOrderFetched, pendingOrders, errorMessage} = useSelector(state => state.order);
	const submit = ({productId,transactionId},e) =>{
		e.preventDefault();
		if(awb!=='' && deliveryPartner!==''){
			dispatch(setdelivery({productId, transactionId}))
		}
	}
	useEffect(()=>{
		dispatch(getPending());
		// eslint-disable-next-line
	},[])
	if(pendingOrderFetched === 'loading'){
		return (<Loadingspinner/>);	
	}else if(pendingOrderFetched === true){
		if(errorMessage===''){
			if(pendingOrders.length!==0){
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
									{pendingOrders.map((order)=>{
										return(
											<tr key={order['_id']}>
												<td>{order['products']['productName']}</td>
												<td><Showprescription lens={order['products']['lens_details']}/></td>
												<td>{order['clientName']}</td>
												<td>{order['products']['quantity']}</td>
												<td>{order['deliveryAddress']}</td>
												<td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Set delivery</button></td>
												<Trackinginput id="exampleModal" productId={order['products']['_id']} _id={order['_id']} handleSubmit={submit}/>
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
	        		            <center><h1>yay!! No pending orders</h1></center>
    	        			</div>
	            		</div>
    	    		</div>
				);
			}
		}
	}
}