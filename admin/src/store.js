import {configureStore, combineReducers} from "@reduxjs/toolkit";
import authenticationReducer from './slices/authentication/authenticationSlice';
import usersReducer from "./slices/users/usersSlice";
const rootReducer = combineReducers({
    user:usersReducer,
    authentication:authenticationReducer,
})
const store = configureStore({
    reducer:rootReducer,
})
export default store;