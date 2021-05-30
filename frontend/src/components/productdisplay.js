import React from 'react';
import axios from 'axios';
import Enterprescription from './enterprescription';
import Carousel from './carousel';
import Alert from './alert';
class ProductDisplay extends React.Component{
	constructor(props){
		super(props);
		this.state={
			id:'',
			rsign:'0',
			lsign:'0',
			resph:0,
			reax:0,
			recyl:0,
			readd:0,
			lesph:0,
			leax:0,
			lecyl:0,
			leadd:0,
			product:[],
			shopname:[],
			error:''
		}
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleSubmit(event){
		axios({
			method: 'POST',
			url: 'http://localhost:5000/cart/addtocart',
			withCredentials: true,
			data:{
				'id':this.props.match.params.productId,
				'lens_details':{
					rsign:this.state.rsign,
					lsign:this.state.lsign,
					resph:this.state.resph,
					reax:this.state.reax,
					recyl:this.state.recyl,
					readd:this.state.readd,
					lesph:this.state.lesph,
					leax:this.state.leax,
					lecyl:this.state.lecyl,
					leadd:this.state.leadd,
				}
			}
		}).then((response) => {
			this.setState({error:''})
		}).catch((error) => {
			if(error!==undefined){
				if(error.response.status===400){
					this.setState({error:'Cannot have products from 2 different sellers'});
				}else if(error.response.status===403){
					this.setState({error:'First Login then add products'});
				}
			}
		});
	}
	handleChange(name, value){
		this.setState({[name]:value});
	}
	componentDidMount(){
		const fetchproduct = () => {
			axios({
				method: 'GET',
				url: 'http://localhost:5000/product/getsingle?id='+this.props.match.params.productId,
				withCredentials: true,
			  }).then((response) => {
				this.setState({product:response.data});
				this.setState({shopname:response.data[0]['shop']});
			  }, (error) => {
					alert(error);
			  });
	   };
		fetchproduct();
	}
	render(){
		return (
			<div className='container'>
				{this.state.product.length!==0 && this.state.shopname.length!==0?
				<div className='row justify-contents-start'>
					<div className='col-sm align-self-center'>
						<Carousel images={this.state.product[0]['image']}/>
					</div>
					<div className='col-sm'>
						<div>
							<small className='text-muted'><h1 className='display-6'>{this.state.product[0]['productname']}</h1></small> 
						</div>	
						<div>
							<h6>Brand: <small className='text-muted'>{this.state.product[0]['brand']}</small></h6>
						</div>
						<div>
							<h6>Sold by: <small className='text-muted'>{this.state.shopname[0]['shopname']}</small></h6>
						</div>
						<div>
							<h6>Price: <small className='text-muted'>{this.state.product[0]['price']}</small></h6>
						</div>	
						<div>
							{console.log(this.state)}
							<h6>{this.state.product[0]['productdescription']}</h6>
						</div>
						<Enterprescription onhandleChange={this.handleChange} lens={this.state} handleSubmit={this.handleSubmit}/>	
						{this.state.error!==''?<Alert message={this.state.error} type='danger'/>:null}
					</div>
				</div>:null}
			</div>
		);
	}
}

export default ProductDisplay;
