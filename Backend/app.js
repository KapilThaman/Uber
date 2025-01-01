const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./DB/db");
const app = express();
const userRoutes = require("./Routes/user.routes");
const captainRoutes = require('./Routes/captain.routes');
const cookieParser = require('cookie-parser');

connectToDb();

app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  }));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/",(req,res)=>{
    res.send("Working");
})

app.use("/users",userRoutes);
app.use('/captains', captainRoutes);

module.exports = app;