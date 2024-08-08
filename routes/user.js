const express = require("express");
const User = require("../models/user");// import the User model

const router = express.Router();

//addUser API
router.post("/addUser", async(req,res)=>{
    try {

        data = req.body;
        usr = new User(data)
        savedData = await usr.save();
        res.status(200).send(savedData)

    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;