const mongoose = require('mongoose')
var UserInfoSchema= new mongoose.Schema({
    fullname : String,
    username : String
    ,
    email : String
    ,
    password : String
    ,
    phoneno : String
    ,
    aboutme : String
    ,
    lookingfor : String

})

mongoose.model('UserInfo', UserInfoSchema)
