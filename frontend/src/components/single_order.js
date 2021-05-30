import React from 'react';
import axios from 'axios';
import Loadingspinner from './Loadingspinner';
import Alert from './alert';
import Carousel from './carousel';
import { Link } from 'react-router-dom';
class single_order extends React.Component{
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
			url: 'http://localhost:5000/transaction/'+this.props.match.params.id,
			withCredentials:true,
		  }).then((response) => {
			  	this.setState({fetched:true});	
				this.setState({transaction:response.data});
		  }, (error) => {
				this.setState({fetched:false});
			  	if(error){
					if(error.response.status===401){
						window.location='http:localhost:3000/logout';
					}
			  }
		  });
	}
	render(){
		if(this.state.fetched==='loading'){
			return(<Loadingspinner/>);
		}else if(this.state.fetched===true){
			return (
				<div className='container-fluid'>
					<div className='row'>
						<div className="col-sm"/>
						<div className='col-sm'>
							{this.state.transaction.map((t)=>{
								return(
                	                <div className="card border-dark mb-3" key={t._id}>
                    	                <div className="card-header">{t._id}</div>
                        	            <div className="card-body text-dark">
                            	            <div className="accordion" id="accordionExample">
                                	            {t.products.map((products)=>{
                                    	            return(
														<div className="accordion-item" key={products.productname}>
                                            	    	<h2 className="accordion-header" id="headingOne">
	                                            	        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
    	                                            	        {products.productname}
        	                                            	</button>
	            	                                        </h2>
    	            	                                    <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
        	            	                                    <div className="accordion-body">
            	            	                                    <div className="card mb-3">
                	            	                                    <Carousel images={products.image}/>
                    	            		                            <div className="card-body">
                        	                	                            <h5 className="card-title"><Link to={'/productdisplay/'+products._id}>{products.productname}</Link></h5>
                            	                	                        <p className="card-text">Quantity: <small className="text-muted">{products.quantity}</small></p>
                                	                	                    <p className="card-text">Total price: <small className='text-muted'>{parseInt(products.price)*parseInt(products.quantity)}</small></p>
                                    	                	            </div>
                                        	                	    </div>
	                                        	                </div>
    	                                        	        </div>
        	                                        	</div>
													)
                                            	})}
                                        	</div>    
                                    	</div>  
                                	</div>
								)
							})}
						</div>	
						<div className="col-sm"/>
					</div>
				</div>
			);
			
		}else{
			return (
				<div className='container'>
					<div className='row'>
						<div className='col align-self-center'>
							<Alert message='Internal server error'/>
						</div>
					</div>
				</div>
			);
		}
	}
}

export default single_order;
