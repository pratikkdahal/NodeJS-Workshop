//require("express")    
//import express from "express"
const express= require("express")
const dbConnect = require("./database/connection")
const User = require("./models/usermodel")
const Blog = require("./models/blogModel")
const app = express()   //express() is a function
const bcrypt = require("bcrypt")
require("dotenv").config() //.config to trigger it

dbConnect()

app.use(express.json()) // acts as a instruction , json format ma aako cha so node le lincha tara bujhdaina so bujh vanera instruction pathako ho


//User Model

app.get("/fetch-users",async function(req,res){  
    // response ma User table ma vako user data send garnu paryo
    const data = await User.find()
    //k k cha thapaunu = User.find() , delete garna- User.findByIdAndDelete() , kei halna cha vane - User.create(), update garna- User.findByIdAndUpdate()
    res.json({
        data : data
    })
})

//BLog Model

app.get("/fetch-blogs",async function(req,res){
    //response ma Blog table ma vako blog data send garnu paryo
    const data = await Blog.find()
    res.json({
        data : data
    })
})

// to post the details in User
app.post("/register",async function(req,res){
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
})


// find by id of User
app.get("/fetch-users/:id", async function(req,res){
    const data = await User.findById(req.params.id)
    res.json({
       data : data
})
})

//find by id of User and remove password
app.get("/fetch-users/:id", async function(req,res){
    const data = await User.findById(req.params.id).select(["-password"]) //tara remove password of that id
    res.json({
       data : data
})
})

// find by id of blog and remove subtitle
app.get("/fetch-blogs/:id", async function(req,res){
    const data = await Blog.findById(req.params.id).select(["-subtitle"]) //tara remove subtitle of that id
    res.json({
       data : data
})
})

// update operation of User
app.patch("/update-users/:id",async function(req,res){
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
})

//update operation of Blog
app.patch("/update-blogs/:id",async function(req,res){
    const id = req.params.id
    const title = req.body.title
    const subtitle = req.body.subtitle
    const description = req.body.description
    await Blog.findByIdAndUpdate(id,{
        title : title,
        subtitle : subtitle, 
        description : description
    })
    res.json({
        message : "Blog with that ID updated Successfully!"
    })
})

app.post("/publish", async function(req,res){
    const title = req.body.title
    const subtitle = req.body.subtitle
    const description = req.body.description
    console.log(title,subtitle,description)
    await Blog.create({
        title : title ,
        subtitle : subtitle , 
        description : description
    })
    res.json({
        message : "Blog published successfully"
    })
})

// find by id and delete operation of Blog
app.delete("/delete/:id",async function(req,res){ 
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.json({
        message : "Blog with that id is deleted successfully !!"
    })
})

// find by id and delete operation of User
app.delete("/delete/:id",async function(req,res){ 
    const id = req.params.id
    await User.findByIdAndDelete(id)

    res.json({
        message : "User with that id is deleted successfully !!"
    })
})

// deleting details of User using body
app.delete("/delete",async function(req,res){ 
    const id = req.body.id
    await User.findByIdAndDelete(id)

    res.json({
        message : "User with that id is deleted successfully !!"
    })
})


app.listen(3000,function(){               //3000->port number,function()->callback function
    console.log("server has started at port 3000")
})

app.get("/about",function(req,res){    // "/about"----is called route or API, Client requested through req and response "AAbout World" was send by server when "/about" was hitted
    res.json({
        address : "about page address",
        name: "pratik"
    })
})

// login

app.post("/login",async function(req,res){
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
        res.json({
            message : "Logged in success"
        })
       }else{
        res.json({
            message : "Invalid message"
        })
       }
    }
})