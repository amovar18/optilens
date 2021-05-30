import axios from 'axios';
import React from 'react';
import Loadingspinner from './Loadingspinner';
import Showprescription from './showprescription';
import Alert from './alert';
export default class Recievedorders extends React.Component{
	constructor(props){
		super(props);
		this.state={
			orders:[],
			fetched:'loading',
			error:''
		}
	}
	componentDidMount(){
		axios({
			url:'http://localhost:5000/order/getall',
			withCredentials:true
		}).then((response)=>{
			this.setState({orders:response.data,fetched:true});
		}).catch((error)=>{
			this.setState({fetched:true});
			if(error!==undefined){
				if(error.response.status===401){
					window.location='http://localhost:3000/login';
				}else if(error.response.status===500){
					this.setState({error:'Internal server error'});
				}else if(error.response.status===404){
					this.setState({error:'No Pending Orders',orders:[]});
				}
			}
		})
	}
	
	render(){
		if(this.state.fetched==='loading'){
			return (<Loadingspinner/>);	
		}else{
			return (
				<div>
				{this.state.orders.length !==0 ?
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
					:<Alert message={this.state.error} type='danger'/>}
				</div>
			);
		}
	}
}

