import axios from 'axios';
import React from 'react';
import Loadingspinner from './Loadingspinner';
import Showprescription from './showprescription';
import Alert from './alert';
import Trackinginput from './trackinginput';
export default class Recievedorders extends React.Component{
	constructor(props){
		super(props);
		this.state={
			orders:[],
			fetched:'loading',
			awb:'',
			delivery_partner:'',
			error:''
		}
		this.handleOnChange=this.handleOnChange.bind(this);
		this.handleOnClick=this.handleOnClick.bind(this);
	}
	handleOnClick(e){
		e.preventDefault();
		if(this.state.awb!=='' && this.state.delivery_partner!==''){
			this.setState({fetched:'loading'});
			axios({
				method:'POST',
				url:'http://localhost:5000/order/setdelivery',
				withCredentials:true,
				data:{
					product_id:e.target.dataset.value,
					transaction_id:e.target.value,
					awb:this.state.awb,
					delivery_partner:this.state.delivery_partner
				}
			}).then((response)=>{
				this.setState({fetched:true});
				this.setState({orders:response.data});
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
			});
		}
	}
	handleOnChange(name,value){
		console.log(this.state);
		this.setState({[name]:value});
	}
	componentDidMount(){
		axios({
			url:'http://localhost:5000/order/getallpending',
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
									{this.state.orders.map((order)=>{
										return(
											<tr>
												<td>{order['products']['productname']}</td>
												<td><Showprescription lens={order['products']['lens_details']}/></td>
												<td>{order['clientname']}</td>
												<td>{order['products']['quantity']}</td>
												<td>{order['deliveryaddress']}</td>
												<td><button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Set delivery</button></td>
												<Trackinginput id="exampleModal" product_id={order['products']['_id']} _id={order['_id']} handlechange={this.handleOnChange} handleSubmit={this.handleOnClick}/>
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

