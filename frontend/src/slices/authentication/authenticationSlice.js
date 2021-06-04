import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
export const userAuth = createAsyncThunk(
    'authentication/userAuth',
    async (_, { getState , rejectWithValue} ) =>{
        const {loginUsername,loginPassword,typeofuser} = getState().authentication;
        try{
            const response = axios.post('http://localhost:5000/auth/signin',{
                'username':loginUsername,
                'password':loginPassword,
                'typeofuser':typeofuser
            },{withCredentials:true});
            return (await response).data;
        }catch(err){
            return rejectWithValue(err.response);
        }
    }
)
export const refreshToken = createAsyncThunk(
    'authentication/refreshToken',
    async (_, { rejectWithValue }) =>{
        try{
            const response = axios.get('http://localhost:5000/auth/getstatus',{withCredentials:true});
            return (await response).data;
        }catch(err){
            return rejectWithValue(err.response.data)
        }
    }
)
export const checkUsernameAvailability = createAsyncThunk(
    'authentication/checkUsernameAvailability',
    async (_, { getState, rejectWithValue } ) =>{
        const {Registration_username} = getState().authentication;
        if(Registration_username!==''){
            try{
                const response = axios.get('http://localhost:5000/user/availability/'+Registration_username,{withCredentials:true});
                return (await response).data;
            }catch(err){
                return rejectWithValue(err.response);
            }
        }
    }
)
export const createCustomer = createAsyncThunk(
    'authentication/create',
    async (_, { getState , rejectWithValue} ) =>{
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
            return rejectWithValue(err.response);
        }
    }
)

export const userDeauth = createAsyncThunk(
    'authentication/userDeauth',
    async (_, {rejectWithValue}) =>{
        try{
            const response = await axios.get('http://localhost:5000/auth/signout',{withCredentials:true});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response);
        }
    }
)
const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        userType:'',
        fetched:false,
        user:{},
        error:'',

        loginUsername:'',
        loginPassword:'',
        typeofuser:'',
        loginerror:'',
                                
        links:[{title:'Home', path:'/'},{ title: `About us`, path: `/about` },{ title: `Product`, path: `/product/all/1` },{ title: `FAQ`, path: `/faq` },{ title: `Login`, path: `/login` }],
        
        Registration_username:'',
        Registration_password:'',
        Registration_name:'',
        Registration_email:'',
        Registration_address:'',
        Registration_phone:'',
        Registration_confirm_password:'',
        registrationError:'',
        passwordMatch:'',
        criteriaError:'',
        availability:'NaN',
        errormessage:'',
        isActive:'',
    },
    reducers:{
        setValue:(state,action)=>{
            state[action.payload.name]=action.payload.value;
        },setpasswordMatch:(state, action)=>{
            state.passwordMatch = action.payload;
        },setcriteriaError:(state, action)=>{
            state.criteriaError = action.payload;
        }
    },
    extraReducers:{
        [userAuth.fulfilled]:(state, action)=>{
            // sign in user and set usertype links and user details;
            state.usertype = action.payload.userType;
            state.user = action.payload.user;
            state.links = action.payload.links;
            state.isAuthenticated = true;
        },[userAuth.rejected]:(state, action)=>{
            // if authentication gets rejected due to some reason
            state.errormessage = action.error;
            state.loginerror = true;
        },[userDeauth.fulfilled]:(state,action)=>{
            // user get successfully loggedout
            state.isAuthenticated=false;
            state.user={};
            state.userType='';
            state.links=action.payload.links;
        },[createCustomer.fulfilled]:(state, action)=>{
            // customer is created successfully
            state.isAuthenticated=true;
            state.user=action.payload.user;
            state.links=action.payload.links;
        },[createCustomer.rejected]:(state, action)=>{
            // problem in creating customer
            state.registrationError = true;
            state.errormessage = action.error;
        },[checkUsernameAvailability.fulfilled]:(state, action)=>{
            state.availability = action.payload;
        },[checkUsernameAvailability.rejected]:(state,action)=>{
            state.availability = false;
        },[refreshToken.fulfilled]:(state,action)=>{
            // refresh the token if available
            state.userType = action.payload.userType;
            state.user=action.payload.user;
            state.links=action.payload.links;
            state.isAuthenticated = true;
        },[refreshToken.rejected]:(state, action)=>{
            state.isAuthenticated = false;
            state.links=action.payload.links;
            state.user = {}; 
            state.userType = '';
        }
    }
})
export const {setValue, setpasswordMatch, setcriteriaError}=authenticationSlice.actions;
export default authenticationSlice.reducer;