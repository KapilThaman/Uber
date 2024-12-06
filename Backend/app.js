const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./DB/db");
const app = express();
const userRoutes = require("./Routes/user.routes");

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.send("Working");
})

app.use("/users",userRoutes);

module.exports = app;