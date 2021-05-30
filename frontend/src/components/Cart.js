import React from 'react';
import Showprescription from './showprescription';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import Loadingspinner from './Loadingspinner';
class Cart extends React.Component{
	constructor(props){
		super(props);
		this.state={
			cart:[],
			fetched:'loading',
			total_price:0,
			delivery_address:'',
			name:'',
			city:'',
			state:'',
			pincode:'',
			address_line_1:'',
			address_line_2:'',
			area:'',
			inserted:false
		}
		this.handleOnchange=this.handleOnchange.bind(this);
		this.handleOnClick=this.handleOnClick.bind(this);
		this.handleOnProceed=this.handleOnProceed.bind(this);
	}
	handleOnchange(e){
		const name=e.target.name;
		this.setState({[name]:e.target.value});
	}
	handleOnProceed(e){
		e.preventDefault();
		axios({
			method: 'POST',
			url: 'http://localhost:5000/transaction/insert',
			withCredentials: true,
			data:{
				delivery_address:this.state.address_line_1+'\n'+this.state.address_line_2+'\n'+this.state.area+'\n'+this.state.city+'-'+this.state.pincode+'\n'+this.state.state,
				total_price:this.state.total_price,
				name:this.state.name
			}
		  }).then((response) => {
				this.setState({inserted:true});
		  }).catch((error) => {
				console.log(error);
		  });
	}
	handleOnClick(e){
		e.preventDefault();
		axios({
			method: 'DELETE',
			url: 'http://localhost:5000/cart/delete',
			withCredentials: true,
			data:{
				'pid':e.target.value
			}
		  }).then((response) => {
				this.setState({cart:response.data[0]['cart'],total_price:response.data[0]['total_price']});
		  }).catch((error) => {
				console.log(error);
		  });
	}
	componentDidMount(){
		const fetchcart = () => {
			axios({
				method: 'GET',
				url: 'http://localhost:5000/cart/getcart',
				withCredentials: true,
			  }).then((response) => {
					this.setState({fetched:true});
					this.setState({cart:response.data[0]['cart'],total_price:response.data[0]['total_price']});
			  }).catch((error) => {
					this.setState({fetched:true});
					if(error.response!==undefined){
						if(error.response.status===403){
							window.location='http://localhost:3000/login';
						}
					}
			  });
	   };
		fetchcart();
	}
	render(){
		if(this.state.inserted===true){
			return(<Redirect to='/yorders'/>);
		}else if(this.state.fetched === 'loading'){
			return(<Loadingspinner/>);
		}else{
			if(this.state.cart.length!==0){
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
								{this.state.cart.map((e) => (
									<tr>
										<td>
											<Link to={"/productdisplay/"+e._id}>{e.productname}</Link>
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
											<button className='btn btn-danger' value={e._id} onClick={this.handleOnClick} type='submit' id="delete">Delete</button>
										</td>
									</tr>
								))}
								<tr>
									<td colSpan='4'>
										Total Price =
									</td>
									<td colSpan='2'>
										{this.state.total_price}
									</td>
								</tr>
								<tr>
									<td colSpan='4'>
										Client Name
									</td>
									<td colSpan='2'>
										<input className='form-control' name='name' placeholder='Client Name' onChange={this.handleOnchange} value={this.state.name}/>
									</td>
								</tr>
								<tr>
									<td colSpan='4'>
										Delivery Address
									</td>
									<td colSpan='2'>
									<input className='form-control' name='address_line_1' placeholder='Address line 1' onChange={this.handleOnchange} value={this.state.address_line_1}/>
									<input className='form-control' name='address_line_2' placeholder='Address line 2' onChange={this.handleOnchange} value={this.state.address_line_2}/>
									<input className='form-control' name='area' placeholder='Area' onChange={this.handleOnchange} value={this.state.area}/>
									<input className='form-control' name='city' placeholder='City' onChange={this.handleOnchange} value={this.state.city}/>
									<input className='form-control' name='pincode' placeholder='Pincode' onChange={this.handleOnchange} value={this.state.pincode}/>
									<input className='form-control' name='state' placeholder='State' onChange={this.handleOnchange} value={this.state.state}/>
									</td>
								</tr>
								
								<tr>
									<td colSpan='4'></td>
									<td colSpan='2'>
										<button className='btn btn-primary' onClick={this.handleOnProceed} type='submit'>Proceed</button>
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
	};
}
export default Cart;