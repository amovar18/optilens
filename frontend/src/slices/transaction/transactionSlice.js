import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getSingle = createAsyncThunk(
    'transaction/getSingle',
    async (id)=>{
        const response = await axios.delete('http://localhost:5000/cart/delete',{withCredentials:true,data:{'pid':id}});
        return response.data;
    }
)
export const getAll = createAsyncThunk(
    'transaction/getAll',
    async ()=>{
        const response = await axios.get('http://localhost:5000/cart/getcart',{withCredentials:true});
        return response.data;
    }
)
const transactionSlice = createSlice({
    name:'transaction',
    initialState:{
        transaction:[],
        error:'',
    },
    reducers:{},
    extraReducers:{
        [getSingle.fulfilled]:(state,action)=>{
            state=action.payload;
        },[getSingle.rejected]:(state,action)=>{
            state=action.payload;
        },[getAll.fulfilled]:(state, action)=>{
            state.transaction=action.payload;
        },[getAll.rejected]: (state, action)=>{
        }
    }

})
export default transactionSlice.reducer;