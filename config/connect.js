//mongoose is required to connect to MongoDB
const mongoose = require("mongoose")

//this will connect to ECRDB database in mongoDB, if ECRDB does not exist, it will be created automatically.
mongoose.connect("mongodb://localhost:27017/ECRDB")
.then(
    ()=>{
        console.log("ECRDB database is connected");
    }
)
.catch(
    (err)=>{
        console.log(err);
    }
)

module.exports = mongoose