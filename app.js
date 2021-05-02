const express= require('express');
const alert= require('alert')
const app = express()
const path = require('path')
const expressHandlebars = require('express-handlebars')
const port = 5000
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static(path.join(__dirname,"./public")))
app.use(express.static(path.join(__dirname,"./node_modules/bootstrap")))
const mongoose = require('mongoose');
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

var userInfoSchema= new mongoose.Schema({
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


const UserInfo = mongoose.model('UserInfo',userInfoSchema)

// const createDocument = async () => {
//     try{
//         const firstUser= new UserInfo({
//             fullname : 'Aayush',
//             username : 'aayush'
//             ,
//             email : 'aayuhs@abc.com'
//             ,
//             password : 'aayush'
//             ,
//             phoneno : '87446478676'
//             ,
//             aboutme : '4th year CSE student'
//             ,
//             lookingfor : 'Mern stack '
        
//         })
//         const result = await firstUser.save()
        
//     }catch(err){
//         console.log(err)
//     }
// }



app.use(bodyParser.json()); 

app.use(bodyParser.urlencoded({
    extended: true
}))

app.set('view engine','ejs')
app.get('/index',(req,res)=>{
    res.render('index')

})

app.post('/index',(req,res)=>{

    const getDocument = async ()=>{
       const result = await UserInfo.findOne({username : req.body.username})
       
       if ((result)&&(result.password==req.body.password)){
            const matchedUser = await UserInfo.find({lookingfor : result.lookingfor,_id:{ $not:{ $eq:result._id } }})
           res.render('search',{result : matchedUser})
       }
       else{
        
        res.send("Invalid Username or Password");
       }

    }
    getDocument()

})

app.get('/search', (req, res)=> {

    const getDocument = async ()=>{
        const result = await UserInfo.find()
       
     }
     getDocument()
})

app.get('/signup',(req,res)=>{
    res.render('signup')
})

app.post('/signup',(req,res)=>{
    
    const createDocument = async () => {
        try{
            const result = await UserInfo.find({username : req.body.username})
            if(result.length>0){
                alert("Hello! I am an alert box!!");
            }
            else{
            const newUser= new UserInfo({
                fullname : req.body.fullname,
                username : req.body.username
                ,
                email : req.body.email
                ,
                password : req.body.password
                ,
                phoneno : req.body.phoneno
                ,
                aboutme : req.body.aboutme
                ,
                lookingfor : req.body.lookingfor
            
            })
            const result = await newUser.save()
            res.render('index')
        }
        }catch(err){
            console.log(err)
        }
    }
    createDocument();

})



app.listen(port, () => console.info(`App listening on port ${port}`))