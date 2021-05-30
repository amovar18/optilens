import React from 'react';
import {Route, Switch} from "react-router-dom";
import Homepage from "./Home";
import Cart from "./Cart";
import Product from "./Product";
import About from "./About";
import Faq from "./Faq";
import Login from "./login";
import Register_seller from './register_seller';
import ProductDisplay from './productdisplay';
import logout from './logout';
import Privateroute from './Privateroute';
import yorders from './yorders';
import Privaterouteseller from './Privaterouteseller';
import Register_product from './register_product';
import Recievedorders from './Recievedorders';
import Privateroutecustomer from './Privateroutecustomer';
import Singleorder from './single_order';
import Pendingorders from './pendingorders';
const Mainrouter = () => {
    return (
        <Switch>
            <Privateroute path="/" exact component={Homepage}/>
            <Route path="/about" component={About}/>
            <Privateroutecustomer path="/cart"  component={Cart}/>
            <Privateroute path="/product/:type/:page"  component={Product}/>
            <Route path="/faq"  component={Faq}/>
            <Route path="/login" component={Login}/>
            <Route path="/logout" component={logout}/>
            <Route path="/registerseller" component={Register_seller}/>
            <Privateroutecustomer path="/yorders/:id" component={Singleorder}/>
            <Privateroutecustomer path="/yorders" component={yorders}/>
            <Privaterouteseller path="/recievedorders"  component={Recievedorders}/>
            <Privaterouteseller path="/insertproduct"  component={Register_product}/>
            <Privaterouteseller path="/pendingorders"  component={Pendingorders}/>
            <Privateroute path="/productdisplay/:productId" component={ProductDisplay}/>
        </Switch>
    );
}

export default Mainrouter
