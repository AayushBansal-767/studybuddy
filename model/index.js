const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost:27017/StudyBuddy",{useNewUrlParser: true, useUnifiedTopology: true},(error)=>{
    if(!error)
    {
        console.log("success connected");
    }
    else
    {
        console.log("fail");
    }
});

const UserInfo = require('./model')