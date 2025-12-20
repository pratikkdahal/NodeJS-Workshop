//require("express")    
//import express from "express"
const express= require("express")
const dbConnect = require("./database/connection")
const User = require("./models/usermodel")
const Blog = require("./models/blogModel")
const app = express()   //express() is a function
const bcrypt = require("bcrypt")

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


app.delete("/delete/:id",async function(req,res){ 
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.json({
        message : "Blog with that id is deleted successfully !!"
    })
})


app.delete("/delete/:id",async function(req,res){ 
    const id = req.params.id
    await User.findByIdAndDelete(id)

    res.json({
        message : "User with that id is deleted successfully !!"
    })
})
// deleting details using body
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
