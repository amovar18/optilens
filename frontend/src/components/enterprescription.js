import React from 'react';
import {setValue} from '../slices/cart/cartSlice';
import {useDispatch} from 'react-redux';
export default function Enterprescription(props){
	const dispatch = useDispatch();
	const submit = (e) =>{
		e.preventDefault();
		props.handleSubmit();
	}
	return (
		<form onSubmit={submit}>
			<div className='table-responsive'>
				<table className='table table-bordered'>
					<thead>
	    				<tr>
						    <th></th>
							<th>
								Sign
							</th>
							<th>
								SPH.
							</th>
							<th>
								CYL.
							</th>
							<th>
								AXIS
							</th>
							<th>
							    ADD
							</th>
        				</tr>
	      			</thead>
					<tbody>
						<tr>
							<td>
								RE (0D)
							</td>
							<td >
								<select style={{'marginRight':'20px'}} className='form-select' name='rsign' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}>
									<option value="0">0</option>
									<option value="+">+</option>
    								<option value="-">-</option>
								</select>
							</td>
					    	<td>
								<input className='form-control' type="num" name="resph" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} />
			    			</td>
    						<td>
								<input className='form-control' type="num" name="recyl" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} />
							</td>
		    				<td>
								<input className='form-control' type="num" name="reax" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} />
					    	</td>
    						<td>
	    						<input className='form-control' type="num" name="readd" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} />
		    				</td>
						</tr>
    					<tr >
							<td>
							    LE (0S)
							</td>
						    <td style={{'marginLeft':'20px'}}>
    							<select className='form-select' name="lsign" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}>
								    <option value="0">0</option>
								    <option value="+">+</option>
								    <option value="-">-</option>
    							</select>
					    	</td>
							<td>
							    <input className='form-control' type="num" name="lesph" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/>
    						</td>
						    <td>
    							<input className='form-control' type="num" name="lecyl" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/>
						    </td>
				    		<td>
    							<input className='form-control' type="num" name="leax" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/>
							</td>
							<td>
    							<input className='form-control' type="num" name="leadd" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/>
						    </td>
					    </tr>
						<tr>
							<td colSpan="7">
								<center><button className='btn btn-primary' type='submit'>Submit</button></center>
							</td>
						</tr>
					</tbody>
				</table>
			</div>		
        </form>
	);
}