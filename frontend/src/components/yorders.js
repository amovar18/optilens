import React, { useEffect } from 'react';
import Loadingspinner from './Loadingspinner';
import Alert from './Alert';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAll } from '../slices/transaction/transactionSlice';
export default function Yorders(props){
	const dispatch= useDispatch();
	const {transaction, fetched} = useSelector(state => state.transaction);
	useEffect(()=>{
		dispatch(getAll());
	},[dispatch]);
	console.log(transaction, fetched);
	if(fetched === 'loading'){
			return(<Loadingspinner/>);
	}else if(fetched===true){
		if(transaction.length!==0){
			return (
				<div className='container-fluid'>
					<div className='row '>
						<div className='col-sm'/>
						<div className='col-sm'>
							{transaction.map((t)=>{
								return(
									<div className="card text-dark bg-light mb-3" style={{'maxWidth': '18rem'}}>
										  <div className="card-header">Order ID: <Link to={'/yorders/'+t._id}>{t._id}</Link></div>
										  <div className="card-body">
											<p className="card-text">Date and time of transaction: {t.date}</p>
											<p className="card-text">Total Products: {t.products.length}</p>
										  </div>
									</div>
								)
							})}
						</div>
						<div className='col-sm'/>
					</div>
				</div>
			);
		}else{
			return(
				<div className='container-fluid' style={{'backgroundColor':'#D3D3D3','height':'100vh'}}>
		            <div className='row' style={{'height':'100vh'}}>
        	        	<div className='col align-self-center'>
	        	            <center><h1>OOPS!! No purchases have been made yet</h1></center>
    	        		</div>
            		</div>
        		</div>
			);
		}
		
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
