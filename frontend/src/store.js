import {configureStore, combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import cartReducer from './slices/cart/cartSlice';
import authenticationReducer from './slices/authentication/authenticationSlice';
import productReducer from './slices/product/productSlice';
import transactionReducer from './slices/transaction/transactionSlice';
import sellerReducer from './slices/seller/sellerSlice';
import orderReducer from './slices/order/orderSlice';
import storage from 'redux-persist/lib/storage';
import {persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from 'redux-persist'
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
    middleware: getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
})
export default store;