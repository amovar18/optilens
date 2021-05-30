import React from 'react';
import axios from 'axios';
import Loadingspinner from './Loadingspinner';
class Register_product extends React.Component{
	constructor(props){
		super(props);
		this.initstate={
                productname:'',
                producttype:'spectacles',
                productprice:0,
                brand:'',
                productdescription:'',
                mainimage:null,
                frontimage:null,
                leftimage:null,
                rightimage:null,
                sent:false
		}
        this.state=this.initstate;
        this.handleChange=this.handleChange.bind(this);
        this.handleFileChange=this.handleFileChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
	}
    handleFileChange(e){
        const name=e.target.name;
        this.setState({ [name]:e.target.files[0] });
    }
    handleSubmit(e){
        e.preventDefault();
        let component=this;
        const formData = new FormData();
        formData.append( "image", this.state.mainimage);
        formData.append( "image", this.state.frontimage);
        formData.append( "image", this.state.leftimage);
        formData.append( "image", this.state.rightimage);
        formData.append( "producttype", this.state.producttype);
        formData.append( "productname", this.state.productname);
        formData.append( "productprice", this.state.productprice);
        formData.append( "brand", this.state.brand);
        formData.append( "productdescription", this.state.brand);
        component.setState({sent:true});
        axios({
            method: 'POST',
            url: 'http://localhost:5000/product/create',
            config:{ headers: {'Content-Type':'multipart/form-data'}},
            withCredentials:true,
            data: formData
          }).then(function (response) {
            component.setState({sent:false});
            console.log(response);
          }).catch(function (err) {
            component.setState({sent:false});
            console.log(err);
        });        
    }
    handleChange(e){
        const target = e.target;
        const value = target.value;
        const name = target.name;
        this.setState({[name]: value});

    }
	render(){
        if(this.state.sent===false){
            return (
    			<div className='container'>
                    <div className='row justify-contents-start'>
                        <div className='col-sm'></div>
                        <div className='col-sm' >
                            <form onSubmit={this.handleSubmit}>
                                <input className='form-control' type="input" placeholder="Product Name" name="productname" value={this.state.productname} onChange={this.handleChange} required/><br/>
                                <select className='form-select' name="producttype" value={this.state.producttype} onChange={this.handleChange} required>
                                    <option value='spectacles'>Spectacles</option>
                                    <option value='sunglasses'>Sunglasses</option>
                                    <option value='contact_lens'>Contact Lens</option>
                                </select><br/>
                                <input className='form-control' type="input" placeholder="Product Brand" name="brand" value={this.state.brand} onChange={ this.handleChange} required/><br/>
                                <input className='form-control' type="input" placeholder="Product Price" name="productprice" value={this.state.productprice} onChange={this.handleChange} required/><br/>
                                <textarea id='mainImage' className='form-control' type="textarea" placeholder="Product Description" name="productdescription" value={this.state.productdescription} onChange={this.handleChange} required></textarea><br/>
                                <label className='form-label' htmlFor='mainImage'>Main Image</label><input className='form-control' type='file' id='mainImage' name="mainimage" onChange={this.handleFileChange} required/><br/>
                                <label className='form-label' htmlFor='frontImage'>Front view</label><input className='form-control' type='file' id='frontImage' name="frontimage" onChange={this.handleFileChange} required/><br/>
                                <label className='form-label' htmlFor='leftImage'>Left view</label><input className='form-control' type='file' id='leftImage' name="leftimage" onChange={this.handleFileChange} required/><br/>
                                <label className='form-label' htmlFor='rightImage'>Right view</label><input className='form-control' type='file' id='rightImage' name="rightimage" onChange={this.handleFileChange} required/><br/>
                                <center><button type="submit" className="btn btn-primary">Insert</button></center>
                            </form>
                        </div>
                        <div className='col-sm'></div>
                    </div>
			    </div>
		    );
        }else{
            return(<Loadingspinner/>);
        }
	}
}

export default Register_product;
