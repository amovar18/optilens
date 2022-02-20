import React from 'react';
import {Route, Routes} from "react-router-dom";
import Homepage from "./Home";
import SellerDisplay from './SellerDisplay';
import CustomerDisplay from './CustomerDisplay';
import Logincontainer from "./Logincontainer";
import Logout from './Logout';
import NotFound from './NotFound';
const Mainrouter = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Homepage/>}/>
            <Route path="/sellers"  element={<SellerDisplay/>}/>
            <Route path="/customers"  element={<CustomerDisplay/>}/>
            <Route path="/sales" element={<Logincontainer/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    );
}

export default Mainrouter
