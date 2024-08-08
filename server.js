const express = require('express');// import express framework
require("./config/connect");//import connect.js
const userRouter = require("./routes/user")

const app = express();
// this is to allow the server to read json data
app.use(express.json());

//http://127.0.0.1:3000/user/
app.use("/user", userRouter);

app.listen( 3000, ()=>{
    console.log("server running...")
});