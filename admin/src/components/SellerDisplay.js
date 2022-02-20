import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { sellerFetch, sellerActivate } from '../slices/users/usersSlice';
import Singleuserlist from './Singleuserlist';
function SellerDisplay(){
	const dispatch =  useDispatch();
	const { sellers } = useSelector((state)=>state.sellers);
	useEffect(() => {
		dispatch(sellerFetch())
	},[dispatch])
	return (
		<div className='container'>
				<br/>
				{sellers ?
				<>
					<div className='row justify-contents-start'>
						<div className='col-12'>
							<Singleuserlist data={sellers} actionToDo={sellerActivate}/>	
						</div>
					</div>
				</>	
				:
				<h1>Could not load data from server</h1>
				}
			</div>
	);
}

export default SellerDisplay;
