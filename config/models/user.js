const mongoose = require("mongoose")

const User = mongoose.model("User",{
    firstname:{
        type: String
    },
    lastname:{
        type:String
    },
    email:{
        type: String
    }
})

module.exports = User