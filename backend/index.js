const express = require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const cartRouter = require('./routes/cartroutes');
const productRouter = require('./routes/productroutes');
const transactionRouter = require('./routes/transactionroutes');
const userRouter = require('./routes/userroutes');
const sellerRouter = require('./routes/sellerroutes');
const authRouter = require('./routes/authenticationroutes');
const adminRouter = require('./routes/adminRoutes');
const orderRouter = require('./routes/ordersroutes');

const bodyParser = require('body-parser');
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1",
    "https://loving-kepler-fcdb88.netlify.app",
    "https://optilens.vercel.app"
  ],
  credentials: true
}

app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));
app.use(cors(corsOptions));
app.use(cookieParser());
app.set('trust proxy', 1);

app.use("/product",productRouter);
app.use("/cart",cartRouter);
app.use("/transaction",transactionRouter);
app.use("/user",userRouter);
app.use("/seller",sellerRouter);
app.use("/auth",authRouter);
app.use("/order",orderRouter); 
app.use("/admin",adminRouter); 
app.listen(process.env.PORT || 5000, process.env.HOST || '::');