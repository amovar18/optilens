import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const setdelivery = createAsyncThunk(
    'order/setdelivery',
    async ({productId, transactionId}, { getState , rejectWithValue})=>{
        const {awb, deliveryPartner} = getState().order;
        try{
            axios({
                url:'https://optilens-backend.herokuapp.com/order/setdelivery',
                method:'POST',
                data:{
                    productId,
					transactionId,
					awb,
					deliveryPartner
                },
                withCredentials: true,
            }).then((response)=>{
                return response.data;
            });
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)
export const getPending = createAsyncThunk(
    'order/getPending',
    async (_, { rejectWithValue})=>{
        try{
            const response = await axios.get('https://optilens-backend.herokuapp.com/order/getallpending',{withCredentials:true});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)
export const getAll = createAsyncThunk(
    'order/getAll',
    async (_, { rejectWithValue})=>{
        try{
            const response = await axios.get('https://optilens-backend.herokuapp.com/order/getall',{withCredentials:true});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.data);
        }
    }
)
const orderSlice = createSlice({
    name:'order',
    initialState:{
        orders:[],
        fetched:'loading',
        errorStatus:'',
        errorMessage:'',

        awb:'',
		deliveryPartner:'',
    },
    reducers:{
        setValue:(state, action)=>{
            state[action.payload.name] = action.payload.value;
        }
    },
    extraReducers:{
        [getPending.fulfilled]:(state,action)=>{
            state.fetched = true;
            state.orders = action.payload;
        },[getPending.rejected]:(state,action)=>{
            state.fetched = true;
            state.error = action.payload;
        },[getAll.fulfilled]:(state, action)=>{
            state.fetched = true;
            state.orders = action.payload;
        },[getAll.rejected]: (state, action)=>{
            state.fetched = true;
            state.error = action.payload;
        }
    }

})
export const {setValue} = orderSlice.actions;
export default orderSlice.reducer;