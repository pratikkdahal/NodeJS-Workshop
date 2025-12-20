//require("express")    
//import express from "express"
const express= require("express")
const dbConnect = require("./database/connection")
const User = require("./models/usermodel")
const Blog = require("./models/blogModel")
const app = express()   //express() is a function

dbConnect()

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
        data
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
