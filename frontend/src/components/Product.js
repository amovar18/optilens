import React from 'react';
import Sidefilter from './sidefilter';
import axios from 'axios';
import Singleproductlist from './single_product_list';
export default class Product extends React.Component{
	constructor(props){
		super(props);
		this.state={
			products:[],
			sort:false
		}
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	componentDidMount(){
		let currentComponent=this;
		if(this.state.sort===false){
			axios({
				method: 'GET',
				url: 'http://localhost:5000/product/'+this.props.match.params.type+'/'+this.props.match.params.page,
			}).then((response) => {
				currentComponent.setState({products:response.data});
			}).catch((error) => {
				console.log(error);
			});
		}
	}
	handleSubmit(sortData,e){
		e.preventDefault();
		this.setState({sort:true});
		axios({
			method: 'GET',
			url: 'http://localhost:5000/product/sort/'+this.props.match.params.type+'/'+sortData.price+'/'+sortData.sort
		}).then((response) => {
			this.setState({products:response.data});
		}).catch((error) => {
			console.log(error);
		});
	}
	render(){
		return (
			<div className='container'>
				<br/>
				<div className='row justify-contents-center'>
					<div className='col-2'>
						<button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Filter/Sort</button>
						<div className="modal fade"id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
							<div className='modal-dialog modal-fullscreen-sm-down'>
									<div className='modal-content'>
									<div className="modal-header">
        								<h5 className="modal-title" id="exampleModalLabel">Sort and Filter</h5>
        								<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	      							</div>
									<div className='modal-body'>
										<Sidefilter onSubmitForm={this.handleSubmit}/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<hr/>
				<div className='row justify-contents-start'>
					<div className='col-12'>
						<Singleproductlist data={this.state.products}/>	
					</div>
				</div>
			</div>
		);
	}
}
