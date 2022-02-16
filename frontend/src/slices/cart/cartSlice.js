import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
export const checkout = createAsyncThunk(
    'cart/checkout',
    async (_, { getState , rejectWithValue})=>{
        const {name,city,state,pincode,address_line_1,address_line_2,area,total_price} = getState().cart;
        try{
            const response = await axios.post('https://optilens-backend.herokuapp.com/cart/addtocart',
            {data:{
                'delivery_address':address_line_1+'\n'+address_line_2+'\n'+area+'\n'+city+'-'+pincode+'\n'+state,
				'total_price':total_price,
				'name':name
            }},
            {withCredentials:true});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response);
        }
    }
)
export const cartAdd = createAsyncThunk(
    'cart/Add',
    async (id,{ getState , rejectWithValue })=>{
        const {lens_details} = getState().cart;
        try{
            const response = axios.post('https://optilens-backend.herokuapp.com/cart/addtocart',{
                'id':id,
                'lens_details':lens_details
            },{
                withCredentials:true
            });
            return (await response).status;
        }catch(error){
            return rejectWithValue(error.response);
        }
    }
)
export const cartDelete = createAsyncThunk(
    'cart/delete',
    async (id)=>{
        const response = await axios.delete('https://optilens-backend.herokuapp.com/cart/delete',{withCredentials:true,data:{'pid':id}});
        return response.data;
    }
)
export const cartGet = createAsyncThunk(
    'cart/getCart',
    async ()=>{
        const response = await axios.get('https://optilens-backend.herokuapp.com/cart/getcart',{withCredentials:true});
        return response.data;
    }
)
const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[],
        lens_details:{
            rsign:'0',
			lsign:'0',
			resph:0,
			reax:0,
			recyl:0,
			readd:0,
			lesph:0,
			leax:0,
			lecyl:0,
			leadd:0,
        },
        total_price:0,
        delivery_address:'',
		name:'',
		city:'',
		state:'',
		pincode:'',
		address_line_1:'',
		address_line_2:'',
		area:'',
        inserted:false,
        fetched:false,
        cartAddError:false,
        checkoutError:false,

        errormessage:'',
        successMessage:''
    },
    reducers:{
        setValue:(state, action)=>{
            state[action.payload.name]=action.payload.value;
        }
    },
    extraReducers:{
        [cartDelete.fulfilled]:(state,action)=>{
            state.cart=action.payload;
        },[cartGet.fulfilled]:(state, action)=>{
            state.cart=action.payload['cart'];
            state.total_price=action.payload['total_price'];
            state.fetched=true
        },[cartGet.rejected]:(state, action)=>{
            state.cart=[];
            state.error=true;
        },[cartAdd.rejected]: (state, action)=>{
            state.cartAddError=true;
            if(action.error.message === '403'){
                state.errormessage = 'First Login then you can add products';
            }
        },[cartAdd.fulfilled]:(state,action) => {
            console.log(action)
            if(action.payload === 200){
                state.successMessage = 'Product added to cart';
            }
        },[checkout.fulfilled]:(state, action)=>{
            state.cart=[];
        },[checkout.rejected]:(state, action)=>{
            state.checkoutError=500;
        },
    }

})
export const {setValue} = cartSlice.actions;
export default cartSlice.reducer;