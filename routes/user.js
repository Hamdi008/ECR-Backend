const express = require("express");
const User = require("../models/user");// import the User model
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken")

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


router.post("/register", async (req,res)=>{
    data = req.body;
    user = new User(data);

    salt = bcrypt.genSaltSync(10);
    cryptedPassword = await bcrypt.hashSync(data.password, salt);
    user.password = cryptedPassword;

    user.save()
        .then(
            (savedData)=>{
                res.status(200).send(savedData);
            }
        )
        .catch(
            (error)=>{
                res.status(400).send(error)
            }
        )
});

//login API
router.post("/login", async (req,res)=>{
    
    data = req.body;
    user = await User.findOne({email: data.email})

    if(!user){
        res.status(404).send("email or password invalid!");
    }else{
        validPassword = bcrypt.compareSync(data.password, user.password)
        
        if(!validPassword){
            res.status(401).send("email or password invalid!");
        }else{
            // object to be send to fronend, you can add what you want.
            paylod = {
                _id: user._id,
                email: user.email,
                name: user.fullname
            }
            token = jwt.sign(paylod, "12345678")// "12345678" is the secret password only for dev 
            res.status(200).send({myToken: token})
        }
    }
})

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