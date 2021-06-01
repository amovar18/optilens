import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
export const userAuth = createAsyncThunk(
    'authentication/userAuth',
    async ( {getState} ) =>{
        const {username,password,typeofuser}=getState().authentication;
        try{
            const response = axios.post('http://localhost:5000/auth/signin',{
                'username':username,
                'password':password,
                'typeofuser':typeofuser
            },{withCredentials:true});
            return (await response).data;
        }catch(err){
            return Promise.reject(401);
        }
    }
)
export const checkUsernameAvailability = createAsyncThunk(
    'authentication/checkUsernameAvailability',
    async ( {getState} ) =>{
        const {Registration_username}=getState().authentication;
        try{
            const response = axios.get('http://localhost:5000/user/availability/'+Registration_username,{withCredentials:true});
            return (await response).data;
        }catch(err){
            return Promise.reject(401);
        }
    }
)
export const createCustomer = createAsyncThunk(
    'authentication/create',
    async ( {getState} ) =>{
        const {Registration_username,Registration_password,Registration_name,Registration_email,Registration_address,Registration_phone}=getState().authentication;
        try{
            const response = axios.post('http://localhost:5000/user/create',{
                'name' : Registration_name,
                'username' : Registration_username,
                'phone' : Registration_phone,
                'email' : Registration_email,
                'password' : Registration_password,
                'address': Registration_address
            },{withCredentials:true});
            return (await response).data;
        }catch(err){
            return Promise.reject(401);
        }
    }
)

export const userDeauth = createAsyncThunk(
    'authentication/userDeauth',
    async () =>{
        try{
            const response = await axios.get('http://localhost:5000/auth/signout',{withCredentials:true});
            return response.status;
        }catch(error){
            return Promise.reject(500);
        }
    }
)
const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        user:{},
        username:'',
        password:'',
        typeofuser:'',
        isAuthenticated:false,
        error:'',
        links:[{title:'Home', path:'/'},{ title: `About us`, path: `/about` },{ title: `Product`, path: `/product/all` },{ title: `FAQ`, path: `/faq` },{ title: `Login`, path: `/login` }],

        Registration_username:'',
        Registration_password:'',
        Registration_name:'',
        Registration_email:'',
        Registration_address:'',
        Registration_phone:'',
        Registration_confirm_password:'',
        registrationError:'',
        availability:'',
        passwordMatch:'',
        criteriaError:''
        
    },
    reducers:{
        setUsername:(state, action)=>{
            state.username=action.payload;
        },setPassword:(state, action)=>{
            state.password=action.payload;
        },setUser:(state,action)=>{
            state.typeofuser=action.payload;
        },setRegistrationPassword:(state,action)=>{
            let regex=RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
            if(regex.test(action.payload)===true){
                state.Registration_password=action.payload;
                state.criteriaError=false;
            }else{
                state.criteriaError=true;
            }
        },setRegistrationConfirmPassword:(state,action)=>{
            if (state.Registration_confirm_password !== undefined && state.Registration_password !== undefined) {  
                if (state.Registration_confirm_password !== state.Registration_password) {
                    state.passwordMatch=false;
                }else{
                    state.passwordMatch=true;
                    state.Registration_confirm_password=action.payload;
                }
            }
        },setRegistrationUsername:(state,action)=>{
            state.Registration_username=action.payload;
        },setRegistrationAddress:(state,action)=>{
            state.Registration_address=action.payload;
        },setRegistrationEmail:(state,action)=>{
            state.Registration_email=action.payload;
        },setRegistrationPhone:(state,action)=>{
            state.Registration_phone=action.payload;
        },setRegistrationName:(state,action)=>{
            state.Registration_name=action.payload;
        }
    },
    extraReducers:{
        [userAuth.fulfilled]:(state, action)=>{
            console.log(action)
            state.user=action.payload.user;
            state.links=action.payload.links;
            console.log(state);
            state.isAuthenticated=true;
            return action.payload.status;
        },[userAuth.rejected]:(state, action)=>{
            state.error = true;
        },[userDeauth.fulfilled]:(state,action)=>{
            state.isAuthenticated=false;
            state.user=action.payload.user;
            state.links=action.payload.links;
            return action.payload.status;
        },[userDeauth.rejected]:(state, action)=>{
            return action.payload;
        },[createCustomer.fulfilled]:(state, action)=>{
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.links=action.payload.links;
            return action.payload.status;
        },[createCustomer.rejected]:(state, action)=>{
            state.registrationError = true;
        },[checkUsernameAvailability.fulfilled]:(state, action)=>{
            state.availability = true;
        },[checkUsernameAvailability.rejected]:(state,action)=>{
            state.availability = false;
        }
    }
})
export const {setPassword,setUser,setUsername,setRegistrationAddress,setRegistrationName,setRegistrationEmail,setRegistrationPassword,setRegistrationUsername,setRegistrationPhone, setRegistrationConfirmPassword}=authenticationSlice.actions;
export default authenticationSlice.reducer;