// mongoDb config file
const mongoose = require('mongoose');

mongoose.set("strictQuery", true);
const dbconnect = ()=>{
mongoose.connect('mongodb://127.0.0.1/skaters', {
useNewUrlParser: true
})
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log("error"+ err);
})
};


module.exports = dbconnect;

