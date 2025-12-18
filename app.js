//require("express")    
//import express from "express"
const express= require("express")
const app = express()   //express() is a function

app.get("/",function(req,res){  
    res.json({name: "pratik"})
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
