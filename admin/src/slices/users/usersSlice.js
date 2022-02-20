import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
export const customerActivate = createAsyncThunk(
    'users/customerActivate',
    async (actionTodDo, id, { rejectWithValue } ) =>{
        try{
            const response = axios.post('https://optilens-backend.herokuapp.com/admin/customer/setunset',{
                _id:id,
                actionTodDo
            },{withCredentials:true});
            return (await response).data;
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
)
export const sellerActivate = createAsyncThunk(
    'users/sellerActivate',
    async (actionTodDo, id, { rejectWithValue} ) =>{
        try{
            const response = axios.post('https://optilens-backend.herokuapp.com/admin/seller/setunset',{
                _id:id,
                actionTodDo
            },{withCredentials:true});
            return (await response).data;
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
)
export const sellerFetch = createAsyncThunk(
    'users/sellerFetch',
    async (_, { rejectWithValue} ) =>{

        try{
            const response = axios.get('https://optilens-backend.herokuapp.com/admin/sellers',{withCredentials:true});
            return (await response).data;
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);
export const customerFetch = createAsyncThunk(
    'users/customerFetch',
    async (_, { rejectWithValue} ) =>{

        try{
            const response = axios.get('https://optilens-backend.herokuapp.com/admin/customer',{withCredentials:true});
            return (await response).data;
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);
const userSlice = createSlice({
    name:'users',
    initialState:{
        sellers: [],
        customers: [],
        fetched:false,
        error:'',
        activationDeactivationSuccessful: '',
    },
    reducers:{
        setValue:(state,action)=>{
            state[action.payload.name]=action.payload.value;
        }
    },
    extraReducers:{
        [sellerActivate.fulfilled]:(state, action)=>{
            // sign in user and set usertype links and user details;
            state.userType = action.payload.userType;
            state.links = action.payload.links;
            state.isAuthenticated = true;
        },[sellerActivate.rejected]:(state, action)=>{
            // if authentication gets rejected due to some reason
            state.loginerror = action.payload;
        },[customerActivate.fulfilled]: (state, action) => {
            state.activationDeactivationSuccessful = true;
        },[customerActivate.rejected]: (state, action) => {
            state.activationDeactivationSuccessful = false;
            state.error = 'some error occured';
        },[customerFetch.fulfilled]: (state, action) => {
            state.customers = action.payload.customers;
            state.fetched = true;
        },[customerFetch.rejected]: (state, action) => {
            state.error = 'Error while fetching data';
            state.fetched = true;
        },[sellerFetch.fulfilled]: (state, action) => {
            state.sellers = action.payload;
            state.fetched = true;
        },[sellerFetch.rejected]: (state, action) => {
            state.error = 'Error while fetching data';
            state.fetched = true;
        },
    }
})
export const {setValue} = userSlice.actions;
export default userSlice.reducer;