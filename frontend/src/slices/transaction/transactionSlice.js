import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getSingle = createAsyncThunk(
    'transaction/getSingle',
    async (id, {rejectWithValue})=>{
        try{
            const response = await axios.delete('https://opticonnect-backend.herokuapp.com/cart/delete',{withCredentials:true,data:{'pid':id}});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)
export const getAll = createAsyncThunk(
    'transaction/getAll',
    async (_, { rejectWithValue})=>{
        try{
            console.log('here');
            const response = await axios.get('https://opticonnect-backend.herokuapp.com/transaction/',{withCredentials:true});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)
const transactionSlice = createSlice({
    name:'transaction',
    initialState:{
        transaction:[],
        error:'',
        fetched:'loading'
    },
    reducers:{},
    extraReducers:{
        [getSingle.fulfilled]:(state,action)=>{
            state.fetched=true;
            state.transaction=action.payload;
            
        },[getSingle.rejected]:(state,action)=>{
            state.fetched=true;
            state.error=action.payload;
        },[getAll.fulfilled]:(state, action)=>{
            state.fetched=true;
            state.transaction=action.payload;
        },[getAll.rejected]: (state, action)=>{
            state.fetched=true;
            state.error=action.payload;
        }
    }

})
export default transactionSlice.reducer;