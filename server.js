const express = require('express');// import express framework
require("./config/connect");//import connect.js

const app = express();
// this is to allow the server to read json data
app.use(express.json());

app.listen( 3000, ()=>{
    console.log("server running...")
});