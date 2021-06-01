import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
export const productSort = createAsyncThunk(
    'product/Sort',
    async (type, price, sort)=>{
        const response = await axios.get('http://localhost:5000/product/sort/'+type+'/'+price+'/'+sort,{withCredentials:true});
        return response.data;
    }
)
export const productGetSingle = createAsyncThunk(
    'porduct/productGetSingle',
    async (id)=>{
        const response = await axios.get('http://localhost:5000/product/getsingle/'+id,{withCredentials:true,data:{'pid':id}});
        return response.data;
    }
)
export const productGet = createAsyncThunk(
    'product/productGet',
    async (type, page)=>{
        const response = await axios.get('http://localhost:5000/product/'+type+'/'+page,{withCredentials:true});
        return response.status;
    }
)
export const productAdd = createAsyncThunk(
    'product/productAdd',
    async (formData, {rejectWithValue})=>{
        try{
            const response = await axios.post('http://localhost:5000/product/create',{withCredentials:true,Headers:{'Content-Type':'multipart/form-data'},data:formData});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response.status);
        }
    }
)
const productSlice = createSlice({
    name:'cart',
    initialState:{
        products:[],
        singleProduct:[],
        total_pages:0,
        sort:false
    },
    reducers:{},
    extraReducers:{
        [productSort.fulfilled]:(state, action)=>{
            state.push(action.payload);
        },
        [productGetSingle.fulfilled]:(state,action)=>{
            state.singleProduct=action.payload;
            return state;
        },
        [productGet.fulfilled]:(state, action)=>{
            state=action.payload;
            return state;
        },
        [productAdd.fulfilled]:(state, action)=>{
            return action.payload;
        },
        [productAdd.rejected]:(state, action)=>{
            return action.payload;
        }
    }

})
export default productSlice.reducer;