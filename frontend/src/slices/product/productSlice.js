import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
export const productSort = createAsyncThunk(
    'product/Sort',
    async (_, { getState , rejectWithValue})=>{
        const {type, price, sort, current_page} = getState().product;
        try{
            const response = await axios.get('https://opticonnect-backend.herokuapp.com/product/sort/'+type+'/'+price+'/'+sort+'/'+current_page,{withCredentials:true});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response);
        }
    }
)
export const productGetSingle = createAsyncThunk(
    'porduct/productGetSingle',
    async (id ,{ rejectWithValue})=>{
        try{
            const response = await axios.get('https://opticonnect-backend.herokuapp.com/product/getsingle/'+id,{withCredentials:true,data:{'pid':id}});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response)
        }
    }
)
export const productGet = createAsyncThunk(
    'product/productGet',
    async (_, { getState , rejectWithValue})=>{
        const {type, current_page, price, sort} = getState().product;
        try{
            const response = await axios.get('https://opticonnect-backend.herokuapp.com/product/sort/'+type+'/'+price+'/'+sort+'/'+current_page,{withCredentials:true});
            return response.data;
        }catch(error){
            return rejectWithValue(error.response);
        }    
    }
)
export const productAdd = createAsyncThunk(
    'product/productAdd',
    async (formData, { rejectWithValue })=>{
        try{
            await axios({
                method:'POST',
                url:'https://opticonnect-backend.herokuapp.com/product/create',
                withCredentials:true,
                headers:{'Content-Type':'multipart/form-data'},
                data:formData
            }).then((response)=>{
                return response.data;
            });
            
        }catch(error){
            return rejectWithValue(error.response);
        }
    }
)
const productSlice = createSlice({
    name:'product',
    initialState:{
        products:[],
        singleProduct:[],
        shopname:[],
        total_pages:0,
        current_page:1,
        sort:'NAN',
        type:'all',
        price:'NAN',
        fetcherror:'',

        productname:'',
        productprice:0,
        producttype:'spectacles',
        productdescription:'',
        brand:'',
        stored:false
    },
    reducers:{
        setValue:(state, action)=>{
            state[action.payload.name] = action.payload.value;
        }
    },
    extraReducers:{
        [productSort.fulfilled]:(state, action)=>{
            state.products = action.payload;
        },[productGetSingle.fulfilled]:(state,action)=>{
            state.singleProduct = action.payload[0];
            state.shopname = action.payload[0]['shop'][0];
        },[productGet.fulfilled]:(state, action)=>{
            state.products=action.payload;
        },[productAdd.fulfilled]:(state, action)=>{
            state.stored = false;
        },[productAdd.rejected]:(state, action)=>{
            state.stored = false;
        },[productAdd.pending]:(state, action)=>{
            state.stored = true;
        }
    }

})
export const {setValue} = productSlice.actions;
export default productSlice.reducer;