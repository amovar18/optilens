import React from 'react';
import axios from 'axios';
import alert from './alert';
class Register_seller extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            email: '',
            password:'',
            confirm_password:'',
            type_of_user:'',
            name:'',
            owner:'',
            username:'',
            phone:'',
            company_registration:'',
            password_equal:'',
            unamavailable:''
        };
        this.fileInput = React.createRef();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleClick=this.handleClick.bind(this);
    }
    handleClick(e){
        const username=this.state.username;
        const component=this;
        if(username!==''){
            axios({
                method: 'get',
                url: 'http://localhost:5000/seller/availability/'+username,
            }).then(function (response) {
                component.setState({unamavailable:response.data});
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
    fileInput(e){
        this.setState({ company_registration:e.target.files[0] });
    }
    handleChange(event) {
        if(event.target.name==='password'){
            let regex=RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if(regex.test(event.target.value)===true){
                this.setState({password:event.target.value});
                return;
            }
        }
        if(event.target.name==='confirm_password'){
            if(event.target.value===this.state.password){
                this.setState({password_equal:true});
            }else{
                this.setState({password_equal:false});
            }
        }
        const name = event.target.name;
        this.setState({[name]: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        if(this.state.unamavailable===true && this.state.password_equal===true){
            const formData = new FormData(); 
            formData.append('email',this.state.email);
            formData.append('password',this.state.password);
            formData.append('name',this.state.name);
            formData.append('owner',this.state.owner);
            formData.append('username',this.state.username);
            formData.append('phone',this.state.phone);
            formData.append( "company_registration", this.state.company_registration);
            axios({
                method: 'POST',
                url: 'http://localhost:5000/product/create',
                config:{ headers: {'Content-Type':'multipart/form-data'}},
                withCredentials:true,
                data: formData
            }).then(function (response) {
                window.location='htpp://localhost:3000/home';
            }).catch(function (err) {
                console.log(err);
            });
        }
    }

    render(){
        return (
    		<div className='container'>
    			<div className='row justify-content-center'>
                    <div className='col-sm'></div>
                    <div className='col-sm'>
                        <h1 className="display-6">New Seller Signup!</h1>
    					<form  onSubmit={this.handleSubmit}><br/>
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Username" aria-label="Recipient's username" aria-describedby="button-check"/>
                                <button className="btn btn-primary" type="submit" id="button-check" onClick={this.handleClick} >Button</button>
                                {this.state.unamavailable===true ? <alert message='Username already in use!!' type='danger'/>:this.state.unamavailable===false?<alert messgae='Username available!' type='success'/> :null}
                            </div>
                            <input className='form-control' placeholder="Email Address" type="email" name="email" required /><br/>
		            		<input className='form-control' name="phone" placeholder="Phone Number" type="tel" pattern="[0-9]{10}" required/><br/>
	    	        		<label className='form-label' htmlFor='companyCertificate'>Company Registration Certificate</label><input id='companyCertificate' className='form-control' type="File" name="company_registration" required accept="image/*" ref={this.fileInput}/><br/>
    			        	<input className='form-control' type="text" placeholder="Seller Name" name="name" required /><br/>
					    	<input className='form-control' type="text" placeholder="Owner Name" name="owner" required /><br/>
					        <input className='form-control' type="password" placeholder="Password" name="password" required onChange={this.handleChange}/><br/>
            				<input className='form-control' name="confirm_password" placeholder="Confirm Password" required onChange={this.checkpass} />
                            {this.state.password_equal===true ? <alert messgae='Passwords not equal!!' type='danger'/>:this.state.password_equal===false?<alert message="Passwords are equal" type='success'/>:null}
                            <br/>
	    				    <button type='submit' className="btn btn-primary">Signup</button>
    	        		</form>
			        </div>
                    <div className='col-sm'></div>
    			</div>
        	</div>
        );
    }
}

export default Register_seller;
