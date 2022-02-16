import React , { useEffect, useRef } from 'react';
import Sidefilter from './Sidefilter';
import Singleproductlist from './Singleproductlist';
import {useDispatch, useSelector} from 'react-redux';
import { setValue, productGet, productSort } from '../slices/product/productSlice';
import Loadingspinner from './Loadingspinner';
import {Navigate, useParams} from 'react-router-dom';
export default function Product(props){
	const params = useParams();
	const dispatch =  useDispatch();
	const {products} = useSelector(state => state.product);
	useEffect(()=>{
		dispatch(setValue({name:'type', value:params.type}))
		dispatch(productGet());
		// eslint-disable-next-line
	},[])
	const submit = (e) =>{
		e.preventDefault();
		dispatch(productSort());
	}
	const fetched = useRef(false);
	const {isAuthenticated, userType} = useSelector(state => state.authentication);
	useEffect(()=>{
		fetched.current=true;
	},[])
	if(fetched.current===false){
		return(<Loadingspinner/>);
	}else if(isAuthenticated===true && userType==='seller'){
        return (<Navigate to='/insertproduct'/>); 
    }else{
		if(products.length === 0){
			return(<h1>Could not load data from server</h1>);
		}else{
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
											<Sidefilter onSubmitForm={submit}/>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<hr/>
					<div className='row justify-contents-start'>
						<div className='col-12'>
							<Singleproductlist data={products}/>	
						</div>
					</div>
				</div>
			);
		}
	}
}
