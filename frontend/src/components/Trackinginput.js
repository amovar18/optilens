import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {setValue} from '../slices/order/orderSlice';
export default function Trackinginput(props){
    const dispatch = useDispatch();
    const {awb, delivery_partner} = useSelector(state => state.order);
	const clicked = (e) =>{
		e.preventDefault();
		props.handleSubmit({productid: e.dataset.productId,transactionid:e.target.value},e);
	}
	return (
        <div id='exampleModal' className="modal fade" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <input type='text' placeholder='AWB No.' className='form-control' name='awb' value={awb} onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/><br/>
						<input type='text' placeholder='Delivery partner' className='form-control' name='delivery_partner' value={delivery_partner} onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/><br/>
                        <button type='submit' onClick={clicked} data-bs-dismiss="modal" data-productId={props.productId} className='btn btn-primary' value={props._id}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
}