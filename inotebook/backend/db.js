const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017"
//mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnect=true&ssl=false

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo Successfully")
    })
}


module.exports = connectToMongo