import React from 'react';
import {Route, Routes} from "react-router-dom";
import Homepage from "./Home";
import Cart from "./Cart";
import Product from "./Product";
import About from "./About";
import Faq from "./Faq";
import Logincontainer from "./Logincontainer";
import Logout from './Logout';
import NotFound from './NotFound';
const Mainrouter = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Homepage/>}/>
            <Route path="/customers/:id" element={<About/>}/>
            <Route path="/sellers/:id"  element={<Cart/>}/>
            <Route path="/customers"  element={<Product/>}/>
            <Route path="/sellers"  element={<Faq/>}/>
            <Route path="/sales" element={<Logincontainer/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    );
}

export default Mainrouter
