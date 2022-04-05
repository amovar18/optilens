import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
export const checkUsernameAvailability = createAsyncThunk(
    'seller/checkUsernameAvailability',
    async (_, { getState , rejectWithValue } ) =>{
        const {username} = getState().seller;
        if(username!==''){
            try{
                const response = axios.get('https://optilens-backend.herokuapp.com/seller/availability/'+username,{withCredentials:true});
                return (await response).data;
            }catch(err){
                return rejectWithValue(err.response);
            }
        }
    }
)
export const createSeller = createAsyncThunk(
    'seller/create',
    async ( formData, {rejectWithValue} ) =>{        
        try{
            await axios({
                method:'POST',
                url:'https://optilens-backend.herokuapp.com/seller/create',
                withCredentials:true,
                data:formData,
                headers:{'Content-Type': 'multipart/form-data'},
            }).then((response)=>{
                return response.data;
            })
        }catch(err){
            return rejectWithValue(err.response.data);
        }
    }
)
const sellerSlice = createSlice({
    name:'seller',
    initialState:{
        email: '',
        password:'',
        confirm_password:'',
        shopname:'',
        owner:'',
        username:'',
        phone:'',
        city:'',
		state:'',
		pincode:'',
		address_line_1:'',
		address_line_2:'',
		area:'',
        registrationError:'',
        passwordMatch:'NaN',
        criteriaError:'NaN',
        availability:'NaN',
        
        success:'',
        error:'false',
        errorMessage:''
    },
    reducers:{
        setValue:(state,action)=>{
            state[action.payload.name] = action.payload.value;
        },setpasswordMatch:(state, action)=>{
            state.passwordMatch = action.payload;
        },setcriteriaError:(state, action)=>{
            state.criteriaError = action.payload;
        }
    },
    extraReducers:{
        [createSeller.fulfilled]:(state, action)=>{
            state.success = true;
        },[createSeller.rejected]:(state, action)=>{
            state.error = true;
            state.errorMessage =  action.payload;
        },[checkUsernameAvailability.fulfilled]:(state, action)=>{
            state.availability = action.payload;
        },[checkUsernameAvailability.rejected]:(state,action)=>{
            state.availability = false;
        }
    }
})
export const {setValue, setpasswordMatch, setcriteriaError}=sellerSlice.actions;
export default sellerSlice.reducer;