import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
export const cartAdd = createAsyncThunk(
    'cart/Add',
    async (id,lens_details,{rejectWithValue})=>{
        try{
            const response = await axios.post('http://localhost:5000/cart/addtocart',{withCredentials:true,
            data:{'id':id,'lens_details':lens_details}});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.status);
        }
    }
)
export const cartDelete = createAsyncThunk(
    'cart/delete',
    async (id)=>{
        const response = await axios.delete('http://localhost:5000/cart/delete',{withCredentials:true,data:{'pid':id}});
        return response.data;
    }
)
export const cartGet = createAsyncThunk(
    'cart/getCart',
    async ()=>{
        const response = await axios.get('http://localhost:5000/cart/getcart',{withCredentials:true});
        return response.data;
    }
)
const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[],
        total_price:0
    },
    reducers:{},
    extraReducers:{
        [cartAdd.fulfilled]:(state, action)=>{
            
            state.push(action.payload);
        },
        [cartDelete.fulfilled]:(state,action)=>{
            state=action.payload;
            return state;
        },
        [cartGet.fulfilled]:(state, action)=>{
            state=action.payload;
            return state;
        },
        [cartAdd.rejected]: (state, action)=>{
            return action.payload;
        }
    }

})
export default cartSlice.reducer;