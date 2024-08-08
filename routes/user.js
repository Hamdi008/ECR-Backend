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

//getUsers API
router.get("/getUsers", async(req,res)=>{
    try {
        users = await User.find()
        res.status(200).send(users)
        
    } catch (error) {
     res.status(400).send(error) 
    }
});

//getUserById
router.get("/getUserById/:id", async(req,res)=>{

    try {
        myId = req.params.id;
        user = await User.findOne({_id: myId});
        res.status(200).send(user);

    } catch (error) {
        res.status(400).send(error)
    }
});

//updateUserById
router.put("/updateUserById/:id", async(req,res)=>{

    try {
        myId = req.params.id;
        newData = req.body;
        updatedData = await User.findByIdAndUpdate({_id: myId}, newData);
        res.status(200).send(updatedData);
    } catch (error) {
        res.status(400).send(error);
    }
});

//deleteUserById
router.delete("/deleteUserById/:id", async(req,res)=>{
    try {
        myId = req.params.id;
        deletedUser = await User.findOneAndDelete({_id: myId});
        res.status(200).send(deletedUser);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;