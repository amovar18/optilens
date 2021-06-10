import React from 'react';
import Alert from './Alert';
import history from '../history';
import { useDispatch, useSelector } from 'react-redux';
import { setcriteriaError, setValue, setpasswordMatch, checkUsernameAvailability, createSeller} from '../slices/seller/sellerSlice';
export default function Register_seller(props){
    const {username,phone, email, owner, shopname,password, confirm_password, availability,passwordMatch, criteriaError, address_line_1,address_line_2, area, pincode, city, state, success} = useSelector(state => state.seller);
    const dispatch = useDispatch();
    const checkavailability = (e) =>{
        if(username!==''){
            dispatch(checkUsernameAvailability());
        }
    }
    const checkpasswordstrength = () =>{
        if(password!==''){
            let regex=RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if(regex.test(password)===true){
                dispatch(setcriteriaError(false));
            }else{
                dispatch(setcriteriaError(true));
            }
        }
    }
    const checkpasswords = () =>{
        if (password !== undefined && confirm_password !== undefined) {  
            if (password !== confirm_password) {
                dispatch(setpasswordMatch(true));
            }else{
                dispatch(setpasswordMatch(false));
            }
        }
    }
    const submit = (e) => {
        e.preventDefault();
        if(availability===true && passwordMatch===false && criteriaError===false){
            const formData = new FormData(); 
            const address=address_line_1+'\n'+address_line_2+'\n'+area+'-'+pincode+'\n'+city+'\n'+state;
            formData.append('email',email);
            formData.append('password',password);
            formData.append('shopname',shopname);
            formData.append('owner',owner);
            formData.append('username',username);
            formData.append('phone',phone);
            formData.append('image', document.getElementById('companyCertificate').files[0]);
            formData.append('address',address);
            
            dispatch(createSeller(formData));
        }
    }
    if(success===true){
        return(
            <div className='container-fluid' style={{'backgroundColor':'#D3D3D3','height':'100vh'}}>
                <div className='row' style={{'height':'100vh'}}>
                    <div className='col' />
                    <div className='col align-self-center'>
                        <h1>Once you are verified you will be sent and email then you can start selling your products</h1>
                        {
                            setTimeout(() => {
                                history.push('/');
                            }, 5000)
                        }        
                    </div>
                    <div className='col'/>
                </div>
            </div>
        );
    }else{
        return (
    	    <div className='container'>
    		    <div className='row justify-content-center'>
                    <div className='col-sm'></div>
                    <div className='col-sm'>
                        <h1 className="display-6">New Seller Signup!</h1>
    	    			<form  onSubmit={submit}><br/>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Username" name='username' aria-label="Recipient's username" aria-describedby="button-check" onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/>
                                <button className="btn btn-primary" type="submit" id="button-check" onClick={checkavailability} >Button</button>
                                {availability===false ? <Alert message='Username already in use!!' type='danger'/>:availability===true?<Alert message='Username available!' type='success'/> :null}
                            </div>
                            <input className='form-control' placeholder="Email Address" type="email" name="email" required onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/><br/>
		            		<input className='form-control' name="phone" placeholder="Phone Number" type="tel" pattern="[0-9]{10}" required onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/><br/>
	                		<label className='form-label' htmlFor='companyCertificate'>Company Registration Certificate</label><input id='companyCertificate' className='form-control' type="file" name="company_registration" required accept="image/*" /><br/>
    		            	<input className='form-control' type="text" placeholder="Seller Name" name="shopname" required onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/><br/>
				        	<input className='form-control' type="text" placeholder="Owner Name" name="owner" required onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))}/><br/>
					        <input className='form-control' type="password" placeholder="Password" name="password" required onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} onKeyUp={checkpasswordstrength}/><br/>
                            {criteriaError===true ? <Alert message='Passwords does not meet criteria' type='danger'/>:criteriaError===false?<Alert message="Passwords meets criteria" type='success'/>:null}            			
                            <input className='form-control' type='password' name="confirm_password" placeholder="Confirm Password" required onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} onKeyUp={checkpasswords} />
                            {passwordMatch===true ? <Alert message='Passwords not equal!!' type='danger'/>:passwordMatch===false?<Alert message="Passwords are equal" type='success'/>:null}
                            <label className='form-label' htmlFor='address'>Address</label>
                            <div label='address'>
                                <input className='form-control' name='address_line_1' placeholder='Address line 1' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required/><br/>
						    	<input className='form-control' name='address_line_2' placeholder='Address line 2' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required/><br/>
							    <input className='form-control' name='area' placeholder='Area' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required/><br/>
    							<input className='form-control' name='city' placeholder='City' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required/><br/>
	    						<input className='form-control' name='pincode' placeholder='Pincode' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required/><br/>
		    					<input className='form-control' name='state' placeholder='State' onChange={e => dispatch(setValue({name:e.target.name, value:e.target.value}))} required/><br/>
                            </div><br/>
	    		    	    <button type='submit' className="btn btn-primary">Signup</button>
    	    	        </form>
    	            </div>
                    <div className='col-sm'></div>
                </div>
            </div>
        );
    }
}
