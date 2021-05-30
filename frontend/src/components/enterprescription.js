import React from 'react';
export default class enterprescription extends React.Component{
	constructor(props){
		super(props);
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleChange(e){
		this.props.onhandleChange(e.target.name,e.target.value);
	}
	handleSubmit(e){
		e.preventDefault();
		this.props.handleSubmit();
	}
	render(){
		return (
			<form onSubmit={this.handleSubmit}>
				{console.log(this.props.lens.rsign)}
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
									<select style={{'marginRight':'20px'}} className='form-select' name='rsign' value={this.props.lens.rsign} onChange={this.handleChange}>
		    							<option value="0">0</option>
	    								<option value="+">+</option>
	    								<option value="-">-</option>
								    </select>
								</td>
					    		<td>
									<input className='form-control' type="num" name="resph" onChange={this.handleChange} value={this.props.lens.resph}/>
			    				</td>
    							<td>
									<input className='form-control' type="num" name="recyl" onChange={this.handleChange} value={this.props.lens.recyl}/>
	    						</td>
			    				<td>
									<input className='form-control' type="num" name="reax" onChange={this.handleChange} value={this.props.lens.reax}/>
					    		</td>
    							<td>
	    							<input className='form-control' type="num" name="readd" onChange={this.handleChange} value={this.props.lens.readd}/>
		    					</td>
							</tr>
    						<tr >
								<td>
								    LE (0S)
								</td>
							    <td style={{'marginLeft':'20px'}}>
    								<select className='form-select' name="lsign" onChange={this.handleChange} value={this.props.lens.lsign}>
									    <option value="0">0</option>
									    <option value="+">+</option>
									    <option value="-">-</option>
    								</select>
						    	</td>
							    <td>
								    <input className='form-control' type="num" name="lesph" onChange={this.handleChange} value={this.props.lens.lesph}/>
    							</td>
							    <td>
    								<input className='form-control' type="num" name="lecyl" onChange={this.handleChange} value={this.props.lens.lecyl}/>
							    </td>
					    		<td>
	    							<input className='form-control' type="num" name="leax" onChange={this.handleChange} value={this.props.lens.leax}/>
							    </td>
								<td>
    								<input className='form-control' type="num" name="leadd" onChange={this.handleChange} value={this.props.lens.leadd}/>
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
}