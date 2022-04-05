import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getSingle = createAsyncThunk(
    'transaction/getSingle',
    async (id, {rejectWithValue})=>{
        try{
            const response = await axios.get('https://optilens-backend.herokuapp.com/transaction/'+id,{withCredentials:true});
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
            const response = await axios.get('https://optilens-backend.herokuapp.com/transaction/',{withCredentials:true});
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
        singleTransaction: [],
        error:'',
        singleTransactionFetched:'loading',
        transactionFetched: 'loading',
    },
    reducers:{},
    extraReducers:{
        [getSingle.fulfilled]:(state,action)=>{
            state.singleTransactionFetched=true;
            state.singleTransaction=action.payload;
        },[getSingle.rejected]:(state,action)=>{
            state.singleTransactionFetched=true;
            state.error=action.payload;
        },[getAll.fulfilled]:(state, action)=>{
            state.transactionFetched=true;
            state.transaction=action.payload;
        },[getAll.rejected]: (state, action)=>{
            state.transactionFetched=true;
            state.error=action.payload;
        }
    }

})
export default transactionSlice.reducer;