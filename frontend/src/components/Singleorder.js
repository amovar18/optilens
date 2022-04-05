import React, { useEffect } from 'react';
import Loadingspinner from './Loadingspinner';
import Alert from './Alert';
import {Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSingle } from '../slices/transaction/transactionSlice';
import Carousel from './Carousel';
export default function Singleorder(props){
	const dispatch= useDispatch();
	const { id } = useParams();
	const {singleTransaction, singleTransactionFetched} = useSelector(state => state.transaction);
	useEffect(()=>{
		dispatch(getSingle(id));
	},[dispatch, id]);
	if(singleTransactionFetched==='loading'){
		return(<Loadingspinner/>);
	}else if(singleTransactionFetched===true){
		return (
			<div className='container-fluid'>
				<div className='row'>
					<div className="col-sm"/>
					<div className='col-sm'>
						{singleTransaction.map((t)=>{
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