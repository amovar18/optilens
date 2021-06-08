import {configureStore, combineReducers} from "@reduxjs/toolkit";
import cartReducer from './slices/cart/cartSlice';
import authenticationReducer from './slices/authentication/authenticationSlice';
import productReducer from './slices/product/productSlice';
import transactionReducer from './slices/transaction/transactionSlice';
import sellerReducer from './slices/seller/sellerSlice';
import orderReducer from './slices/order/orderSlice';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    cart:cartReducer,
    authentication:authenticationReducer,
    product:productReducer,
    seller:sellerReducer,
    order:orderReducer,
    transaction: transactionReducer  
})
const persistConfig = {
    key: 'root',
    storage
};
const persistedReducer = persistReducer({persistConfig,rootReducer});
const store = configureStore({
    reducer:persistedReducer,
})
export default store;