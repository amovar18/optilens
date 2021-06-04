import React from 'react';
import Loadingspinner from './Loadingspinner';
import {useSelector, useDispatch} from 'react-redux';
import {productAdd, setValue} from '../slices/product/productSlice';
export default function Register_product (props){
    const {stored ,productname,producttype,productprice,brand,productdescription} = useSelector(state => state.product);
    const dispatch = useDispatch();
    const submit = (e) =>{
        e.preventDefault();
        const formData = new FormData();
        dispatch(setValue({name:stored, value:true}));
        formData.append( "image", document.getElementById('mainImage').files[0]);
        formData.append( "image", document.getElementById('frontImage').files[0]);
        formData.append( "image", document.getElementById('leftImage').files[0]);
        formData.append( "image", document.getElementById('rightImage').files[0]);
        formData.append( "producttype", producttype);
        formData.append( "productname", productname);
        formData.append( "productprice", productprice);
        formData.append( "brand", brand);
        formData.append( "productdescription", productdescription);
        dispatch(productAdd(formData));  
    }
    if(stored === false){
        return (
    		<div className='container'>
                <div className='row justify-contents-start'>
                    <div className='col-sm'></div>
                    <div className='col-sm' >
                        <form onSubmit={submit}>
                            <input className='form-control' type="input" placeholder="Product Name" name="productname" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required/><br/>
                            <select className='form-select' name="producttype" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required>
                                <option value='spectacles'>Spectacles</option>
                                <option value='sunglasses'>Sunglasses</option>
                                <option value='contact_lens'>Contact Lens</option>
                            </select><br/>
                            <input className='form-control' type="input" placeholder="Product Brand" name="brand" onChange={ e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required/><br/>
                            <input className='form-control' type="input" placeholder="Product Price" name="productprice" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required/><br/>
                            <textarea className='form-control' type="textarea" placeholder="Product Description" name="productdescription"  onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required></textarea><br/>
                            <label className='form-label' htmlFor='mainImage'>Main Image</label><input className='form-control' type='file' id='mainImage' name="mainimage"  required/><br/>
                            <label className='form-label' htmlFor='frontImage'>Front view</label><input className='form-control' type='file' id='frontImage' name="frontimage" required/><br/>
                            <label className='form-label' htmlFor='leftImage'>Left view</label><input className='form-control' type='file' id='leftImage' name="leftimage"  required/><br/>
                            <label className='form-label' htmlFor='rightImage'>Right view</label><input className='form-control' type='file' id='rightImage' name="rightimage"  required/><br/>
                            <center><button type="submit" className="btn btn-primary">Insert</button></center>
                        </form>
                    </div>
                    <div className='col-sm'></div>
                </div>
			</div>
		);
    }else if(stored===true){
        return(<Loadingspinner/>);
    }
}
