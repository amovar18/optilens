var express = require('express');
var app=express();
var cors=require('cors');
var cookieParser=require('cookie-parser');
var cartRouter = require('./routes/cartroutes');
var productRouter = require('./routes/productroutes');
var transactionRouter = require('./routes/transactionroutes');
var userRouter = require('./routes/userroutes');
var sellerRouter = require('./routes/sellerroutes');
var authRouter = require('./routes/authenticationroutes');
var orderRouter = require('./routes/ordersroutes');

const bodyParser = require('body-parser');
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
  ],
  credentials: true
}

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/product",productRouter);
app.use("/cart",cartRouter);
app.use("/transaction",transactionRouter);
app.use("/user",userRouter);
app.use("/seller",sellerRouter);
app.use("/auth",authRouter);
app.use("/order",orderRouter);

app.listen(process.env.PORT || 5000);