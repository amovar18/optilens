import {configureStore, combineReducers} from "@reduxjs/toolkit";
import cartReducer from './slices/cart/cartSlice';
import authenticationReducer from './slices/authentication/authenticationSlice';
import productReducer from './slices/product/productSlice';

const rootReducer = combineReducers({
    cart:cartReducer,
    authentication:authenticationReducer,
    product:productReducer
})
const store = configureStore({
    reducer:rootReducer,    
})
export default store;