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
const customerSlice = createSlice({
    name:'authentication',
    initialState:{
        user:{},
        username:'',
        password:'',
        typeofuser:'',
        isAuthenticated:false,
        error:'',
        links:[{title:'Home', path:'/'},{ title: `About us`, path: `/about` },{ title: `Product`, path: `/product/all` },{ title: `FAQ`, path: `/faq` },{ title: `Login`, path: `/login` }]
    },
    reducers:{
        setUsername:(state, action)=>{
            state.username=action.payload;
        },setPassword:(state, action)=>{
            state.password=action.payload;
        },setConfirmPassword:(state, action)=>{
            state.password=action.payload;
        },setUser:(state,action)=>{
            state.typeofuser=action.payload;
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
            console.log(action);
            state.error = true;
        },[userDeauth.fulfilled]:(state,action)=>{
            state.isAuthenticated=false;
            state.user=action.payload.user;
            state.links=action.payload.links;
            return action.payload.status;
        },[userDeauth.rejected]:(state, action)=>{
            return action.payload;
        }
    }
})
export const {setPassword,setUser,setUsername}=customerSlice.actions;
export default customerSlice.reducer;