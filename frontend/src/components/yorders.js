import React from 'react';
import axios from 'axios';
import Loadingspinner from './Loadingspinner';
import Alert from './alert';
import {Link} from 'react-router-dom';
class Yorders extends React.Component{
	constructor(props){
		super(props);
		this.state={
			transaction:[],
			fetched:'loading'
		}
	}
	componentDidMount(){
		axios({
			method: 'GET',
			url: 'http://localhost:5000/transaction/',
			withCredentials:true,
		  }).then((response) => {
			  	this.setState({fetched:true});	
				this.setState({transaction:response.data});
		  }, (error) => {
				this.setState({fetched:false});
			  	if(error){
					if(error.response.status===401){
						window.location='http:localhost:3000/logout';
					}else{

					}
			  }
		  });
	}
	render(){
		console.log(this.state)
		if(this.state.fetched==='loading'){
			return(<Loadingspinner/>);
		}else if(this.state.fetched===true){
			return (
				<div className='container-fluid'>
					<div className='row '>
						<div className='col-sm'/>
						<div className='col-sm'>
							{this.state.transaction.length !==0 ?this.state.transaction.map((t)=>{
								return(
									<div className="card text-dark bg-light mb-3" style={{'maxWidth': '18rem'}}>
	  									<div className="card-header">Order ID: <Link to={'/yorders/'+t._id}>{t._id}</Link></div>
  										<div className="card-body">
											<p className="card-text">Date and time of transaction: {t.date}</p>
    										<p className="card-text">Total Products: {t.products.length}</p>
	  									</div>
									</div>
								)
							}):<Alert message='No purchases made yet!' type='danger'/>}
						</div>
						<div className='col-sm'/>
					</div>
				</div>
			);
		}else{
			return (
				<div className='row'>
					<div className='col align-self-center'>
						<Alert message='Internal server error' type='danger'/>
					</div>
				</div>
			);
		}
	}
}

export default Yorders;
