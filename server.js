const express = require('express');// import express framework
require("./config/connect");//import connect.js
const userRouter = require("./routes/user")
const cors = require('cors');  // Import the cors package

const app = express();
// this is to allow the server to read json data
app.use(express.json());

// Use CORS middleware to allow requests from specific origins
app.use(cors({
    origin: 'http://localhost:4200',  // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }));

//http://127.0.0.1:3000/user/
app.use("/user", userRouter);

app.listen( 3000, ()=>{
    console.log("server running...")
});