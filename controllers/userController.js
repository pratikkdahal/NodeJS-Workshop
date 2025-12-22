const User = require("../models/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

exports.homePage = function(req,res){    // "/about"----is called route or API, Client requested through req and response "AAbout World" was send by server when "/about" was hitted
    res.json({
        address : "about page address",
        name: "pratik"
    })
}

exports.fetchUser = async function(req,res){  
    // response ma User table ma vako user data send garnu paryo
    const data = await User.find()
    //k k cha thapaunu = User.find() , delete garna- User.findByIdAndDelete() , kei halna cha vane - User.create(), update garna- User.findByIdAndUpdate()
    res.json({
        data : data
    })
}

exports.register = async function(req,res){
    // console.log(req.body)  accessing whole body i.e. name, email, password in js
    const name = req.body.name // accesing name data from body object in js
    const email = req.body.email
    const password = req.body.password
    // const{name,email,password} = req.body (object destructuring)
    console.log(name,email,password)
    await User.create({
        name : name,  // column-name/field-name : value,
        email : email,
        password : bcrypt.hashSync(password,10) //10 is salt which means password lai kattiko strong password/hash banaune
    })

    res.json({
    message : "User registered successfully!"
})
}


exports.findUserByID = async function(req,res){
    const data = await User.findById(req.params.id)
    res.json({
       data : data
})
}



exports.findUserByIdAndRemovePw = async function(req,res){
    const data = await User.findById(req.params.id).select(["-password"]) //tara remove password of that id
    res.json({
       data : data
})
}


exports.updateUserById = async function(req,res){
    const id = req.params.id
    const name = req.body.name
    const password = req.body.password
    const email = req.body.email
    await  User.findByIdAndUpdate(id,{
        name : name,
        email : email, 
        password : password
    })
    res.json({
        message : "User with that ID updated Successfully!"
    })
}

exports.findByIdAndDeleteUser = async function(req,res){ 
    const id = req.params.id
    await User.findByIdAndDelete(id)

    res.json({
        message : "User with that id is deleted successfully !!"
    })
}

exports.userLogin = async function(req,res){
    //const email = req.body.id
    //const password = req.body.password
    const {email, password} = req.body
    const data = await User.findOne({email:email})
    if(!data){
        res.json({
            message : "Not registered !"
        })
    }else{
       const isMatched = bcrypt.compareSync(password, data.password)
       if(isMatched){
        const token = jwt.sign({name :"Pratik"},process.env.JWT_SECRET,{
            expiresIn : "1d"
        })
        res.json({
            message : "Logged in success" ,
            token : token
        })
       }else{
        res.json({
            message : "Invalid message" 
        })
       }
    }
}