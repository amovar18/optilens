import React from 'react';
export default class trackinginput extends React.Component{
	constructor(props){
		super(props);
        this.state={
            awb:'',
            delivery_partner:''
        }
		this.handleOnChange=this.handleOnChange.bind(this);
		this.handleOnClick=this.handleOnClick.bind(this);
	}
	handleOnClick(e){
		e.preventDefault();
		this.props.handleSubmit(e);
	}
	handleOnChange(e){
		const name=e.target.name;
        this.setState({[name]:e.target.value});
        this.props.handlechange(name,e.target.value);
	}
	render(){
		return (
            <div id='exampleModal' className="modal fade" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <input type='text' placeholder='AWB No.' className='form-control' name='awb' value={this.state.awb} onChange={this.handleOnChange}/><br/>
							<input type='text' placeholder='Delivery partner' className='form-control' name='delivery_partner' value={this.state.delivery_partner} onChange={this.handleOnChange}/><br/>
                            <button type='submit' onClick={this.handleOnClick} data-bs-dismiss="modal" data-value={this.props.product_id} className='btn btn-primary' value={this.props._id}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        );
	}
}

