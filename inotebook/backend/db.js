const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected to mongo successfully");
    } catch (error) {
        console.error("Error connecting to mongo:", error);
    }
}

module.exports = connectToMongo;


// const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017"
// //mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnect=true&ssl=false

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("connected to mongo Successfully")
//     })
// }


// module.exports = connectToMongo 
// ********************************************************************
// The error message you are seeing indicates that mongoose.connect() no longer accepts a callback function. This change was introduced in Mongoose 6.0. Instead, mongoose.connect() returns a promise.

// To fix this, you need to use async/await or handle the promise returned by mongoose.connect() directly. Here's how you can modify your code to use async/await:
// **************************************************************************

