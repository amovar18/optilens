import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { customerFetch, customerActivate } from '../slices/users/usersSlice';
import Singleuserlist from './Singleuserlist';
function CustomerDisplay(){
	const dispatch =  useDispatch();
	const { customers } = useSelector((state)=>state.customers);
	useEffect(() => {
		dispatch(customerFetch())
	},[dispatch])
	return (
		<div className='container'>
				<br/>
				{customers ?
				<>
					<div className='row justify-contents-start'>
						<div className='col-12'>
							<Singleuserlist data={customers} actionToDo={customerActivate}/>	
						</div>
					</div>
				</>	
				:
				<h1>Could not load data from server</h1>
				}
			</div>
	);
}

export default CustomerDisplay;
