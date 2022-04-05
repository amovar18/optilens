import React from 'react';
import {Route, Routes} from "react-router-dom";
import Homepage from "./Home";
import Cart from "./Cart";
import Product from "./Product";
import About from "./About";
import Faq from "./Faq";
import Logincontainer from "./Logincontainer";
import RegisterSeller from './Registerseller';
import ProductDisplay from './Productdisplay';
import Logout from './Logout';
import Yorders from './Yorders';
import Privaterouteseller from './Privaterouteseller';
import RegisterProduct from './Registerproduct';
import Recievedorders from './Recievedorders';
import Privateroutecustomer from './Privateroutecustomer';
import Singleorder from './Singleorder';
import Pendingorders from './Pendingorders';
import NotFound from './NotFound';
const Mainrouter = () => {
    return (
        <Routes>
            <Route path="/" exact element={<Homepage/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/cart"  element={<Privateroutecustomer><Cart/></Privateroutecustomer>}/>
            <Route path="/product/:type/:page"  element={<Product/>}/>
            <Route path="/faq"  element={<Faq/>}/>
            <Route path="/login" element={<Logincontainer/>}/>
            <Route path="/logout" element={<Logout/>}/>
            <Route path="/registerseller" element={<RegisterSeller/>}/>
            <Route path="/yorders/:id" element={<Privateroutecustomer><Singleorder/></Privateroutecustomer>}/>
            <Route path="/yorders" element={<Privateroutecustomer><Yorders/></Privateroutecustomer>}/>
            <Route path="/recievedorders"  element={<Privaterouteseller><Recievedorders/></Privaterouteseller>}/>
            <Route path="/insertproduct"  element={<Privaterouteseller><RegisterProduct/></Privaterouteseller>}/>
            <Route path="/pendingorders"  element={<Privaterouteseller><Pendingorders/></Privaterouteseller>}/>
            <Route path="/productdisplay/:productId" element={<ProductDisplay/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    );
}

export default Mainrouter
