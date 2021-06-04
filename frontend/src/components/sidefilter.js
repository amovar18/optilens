import React from 'react';
import { useDispatch } from 'react-redux';
import { Link} from 'react-router-dom';
import { setValue } from '../slices/product/productSlice';

export default function Sidefilter (props){
    const dispatch = useDispatch();
    const submit = (e) =>{
        props.onSubmitForm(e);
    }
    return (
        <div className='container'>
            <div className='row justify-contents-start'>
		        <form>
				    <h3>Categories</h3>
            	    <ul className='list-group'>
                        <li className='list-group-item'><Link to="/product/all/1">All</Link></li>
                        <li className='list-group-item'><Link to="/product/sunglasses/1">Sunglasses</Link></li>
                        <li className='list-group-item'><Link to="/product/spectacles/1">Spectacles</Link></li>
                        <li className='list-group-item'><Link to="/product/contact_lens/1">Contact Lens</Link></li>
                    </ul>
                    <br/>
                </form>
            </div>
            <hr/>
		    <div className='row justify-contents-start'>
                <h4>Filters</h4>
		        <div>
                    <form onSubmit={submit}>
                        <div className='form-control'>
                            <label className='form-label' >Price</label>
                            <select className='form-select' id="select-price" name='price' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}>
    	    				    <option value="NAN">Price</option>
		        		        <option value="0">Rs 0 - Rs 1000</option>
			        		    <option value="1000">Rs 1001.00 - Rs2000</option>
    					        <option value="2000">Rs 2001.00 - Rs 3000</option>
		    				    <option value="3000">Rs 3001.00 - Rs 5000</option>
        			    	    <option value="5000">Rs 5000+</option>
    	    				</select>
                        </div>
                        <br/>
                        <div className='form-control'>
                            <label className='form-label' >Sorting</label>
                            <select className='form-select' id="select-sort" name='sort' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}>
                                <option value="NAN">No sorting</option>
                                <option value="up">Price: low to high</option>
    				    		<option value="down">Price: high to low</option>
    		    			</select>
                        </div>		
                        <br/>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

