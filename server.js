const express = require('express');// import express framework
require("./config/connect");//import connect.js
const userRouter = require("./routes/user")
const cors = require('cors');  // Import the cors package
const port = 3000;
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Define the directory and file path
const dirPath = path.join(__dirname, 'Logs');
const filePath = path.join(dirPath, 'log.json');

// Check if the directory exists and create it if not
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

const app = express();
// this is to allow the server to read json data
app.use(express.json());

// Use CORS middleware to allow requests from specific origins
app.use(cors({
    origin: 'http://localhost:4200',  // Allow requests from this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
  }));

  // Use body-parser to parse JSON requests
app.use(bodyParser.json());

// Define the POST route to handle the incoming data
app.post('/api/data', async (req, res) => {
  const jsonData = req.body; // Get the JSON data from the request body

  // Store the data in the file (append to file or write to it)
  fs.appendFile(filePath, JSON.stringify(jsonData, null, 2) + '\n', (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error writing to file' }); 
    }
    console.log("Data received and saved")
    res.status(200).json({ message: 'Data received and saved' });
  });
});

//http://127.0.0.1:3000/user/
app.use("/user", userRouter);

app.listen( port, ()=>{
    console.log("server running...")
});