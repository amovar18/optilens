import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
export const userAuth = createAsyncThunk(
    'authentication/userAuth',
    async (_, { getState , rejectWithValue} ) =>{
        const {loginUsername,loginPassword} = getState().authentication;
        try{
            const response = await axios.post('https://optilens-backend.herokuapp.com/admin/signin',{
                'username':loginUsername,
                'password':loginPassword,
                },
                {withCredentials:true});
            return response.data;
            
            
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
)
export const refreshToken = createAsyncThunk(
    'authentication/refreshToken',
    async (_, { getState , rejectWithValue }) =>{
        const {isAuthenticated} = getState().authentication;
        if(isAuthenticated===false){
            try{
                const response = axios.get('https://optilens-backend.herokuapp.com/auth/getstatus',{withCredentials:true});
                return (await response).data;
            }catch(err){
                return rejectWithValue(err.response.data);
            }
        }
    }
)
export const userDeauth = createAsyncThunk(
    'authentication/userDeauth',
    async (_, {rejectWithValue}) =>{
        try{
            const response = await axios.get('https://optilens-backend.herokuapp.com/auth/signout',{withCredentials:true});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)
const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        isAuthenticated:false,
        fetched:false,
        username: '',
        error:'',

        loginUsername:'',
        loginPassword:'',
        loginerror:'',
        links:[{title:'Login', path:'/login'}],
    },
    reducers:{
        setValue:(state,action)=>{
            state[action.payload.name]=action.payload.value;
        }
    },
    extraReducers:{
        [userAuth.fulfilled]:(state, action)=>{
            // sign in user and set usertype links and user details;
            state.links = action.payload.links;
            state.isAuthenticated = true;
        },[userAuth.rejected]:(state, action)=>{
            // if authentication gets rejected due to some reason
            state.loginerror = action.payload;
        },[userDeauth.fulfilled]:(state,action)=>{
            // user get successfully loggedout
            state.isAuthenticated=false;
            state.user={};
            state.links=action.payload.links;
        },[refreshToken.fulfilled]:(state,action)=>{
            // refresh the token if available
            state.user=action.payload.user;
            state.links=action.payload.links;
            state.isAuthenticated = true;
        },[refreshToken.rejected]:(state, action)=>{
            state.isAuthenticated = false;
            state.links=action.payload.links;
            state.user = {}; 
        }
    }
})
export const {setValue, setpasswordMatch, setcriteriaError} = authenticationSlice.actions;
export default authenticationSlice.reducer;