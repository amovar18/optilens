import React from 'react';
import {Route, Switch} from "react-router-dom";
import Homepage from "./Home";
import Cart from "./Cart";
import Product from "./Product";
import About from "./About";
import Faq from "./Faq";
import Logincontainer from "./Logincontainer";
import Register_seller from './Registerseller';
import ProductDisplay from './Productdisplay';
import Logout from './Logout';
import Privateroute from './Privateroute';
import yorders from './Yorders';
import Privaterouteseller from './Privaterouteseller';
import Register_product from './Registerproduct';
import Recievedorders from './Recievedorders';
import Privateroutecustomer from './Privateroutecustomer';
import Singleorder from './Singleorder';
import Pendingorders from './Pendingorders';
import NotFound from './NotFound';
const Mainrouter = () => {
    return (
        <Switch>
            <Privateroute path="/" exact component={Homepage}/>
            <Route path="/about" component={About}/>
            <Privateroutecustomer path="/cart"  component={Cart}/>
            <Privateroute path="/product/:type/:page"  component={Product}/>
            <Route path="/faq"  component={Faq}/>
            <Route path="/login" component={Logincontainer}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/registerseller" component={Register_seller}/>
            <Privateroutecustomer path="/yorders/:id" component={Singleorder}/>
            <Privateroutecustomer path="/yorders" component={yorders}/>
            <Privaterouteseller path="/recievedorders"  component={Recievedorders}/>
            <Privaterouteseller path="/insertproduct"  component={Register_product}/>
            <Privaterouteseller path="/pendingorders"  component={Pendingorders}/>
            <Privateroute path="/productdisplay/:productId" component={ProductDisplay}/>
            <Route path='*' component={NotFound}/>
        </Switch>
    );
}

export default Mainrouter
