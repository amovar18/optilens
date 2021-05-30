import React from 'react';
import { Link} from 'react-router-dom';

export default class Sidefilter extends React.Component{
    constructor(props){
        super(props);
        this.state={
            price:'NAN',
            sort:'NAN'
        }
        this.handleChange=this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    handleChange(e){
        const name=e.target.name;
        this.setState({[name]:e.target.value});
    }
    handleSubmit(e){
        this.props.onSubmitForm(this.state,e);
    }
    render(){
	    return (
            <div className='container'>
                <div className='row justify-contents-start'>
			        <form>
				        <h3>Categories</h3>
            		    <ul className='list-group'>
                            <li className='list-group-item'><Link to="/product/all">All</Link></li>
                            <li className='list-group-item'><Link to="/product/sunglasses">Sunglasses</Link></li>
                            <li className='list-group-item'><Link to="/product/spectacles">Spectacles</Link></li>
                            <li className='list-group-item'><Link to="/product/contact_lens">Contact Lens</Link></li>
                        </ul>
                        <br/>
                    </form>
                </div>
                <hr/>
		        <div className='row justify-contents-start'>
                    <h4>Filters</h4>
			        <div>
                        <form onSubmit={this.handleSubmit}>
                            <div className='form-control'>
                                <label className='form-label' >Price</label>
                                <select className='form-select' id="select-price" name='price'value={this.state.price} onChange={this.handleChange}>
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
                                <select className='form-select' id="select-sort" name='sort' value={this.state.sort} onChange={this.handleChange}>
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
}

