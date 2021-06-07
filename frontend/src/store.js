import {configureStore, combineReducers} from "@reduxjs/toolkit";
import cartReducer from './slices/cart/cartSlice';
import authenticationReducer from './slices/authentication/authenticationSlice';
import productReducer from './slices/product/productSlice';
import transactionReducer from './slices/transaction/transactionSlice';
import sellerReducer from './slices/seller/sellerSlice';
import orderReducer from './slices/order/orderSlice';
const rootReducer = combineReducers({
    cart:cartReducer,
    authentication:authenticationReducer,
    product:productReducer,
    seller:sellerReducer,
    order:orderReducer,
    transaction: transactionReducer  
})
const store = configureStore({
    reducer:rootReducer,
})
export default store;