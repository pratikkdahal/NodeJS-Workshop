//require("express")    
//import express from "express"
const express= require("express")
const dbConnect = require("./database/connection")
const User = require("./models/usermodel")
const Blog = require("./models/blogModel")
const app = express()   //express() is a function

const { fetchBlog, findBlogByIdAndRemoveSubtitle, updateBlogById, publish, findByIdAndDeleteBlog } = require("./controllers/blogController")
const { fetchUser, register, findUserByID, findUserByIdAndRemovePw, updateUserById, findByIdAndDeleteUser, userLogin, homePage } = require("./controllers/userController")
require("dotenv").config() //.config to trigger it

dbConnect()

app.use(express.json()) // acts as a instruction , json format ma aako cha so node le lincha tara bujhdaina so bujh vanera instruction pathako ho


app.get("/",homePage)

//User Model

app.get("/fetch-users", fetchUser)

//BLog Model

app.get("/fetch-blogs", fetchBlog)

// to post the details in User
app.post("/register", register)


// find by id of User
app.get("/fetch-users/:id", findUserByID)

//find by id of User and remove password
app.get("/fetch-users/:id", findUserByIdAndRemovePw)

// find by id of blog and remove subtitle
app.get("/fetch-blogs/:id", findBlogByIdAndRemoveSubtitle)

// update operation of User
app.patch("/update-users/:id", updateUserById)

//update operation of Blog
app.patch("/update-blogs/:id", updateBlogById)

app.post("/publish", publish)

// find by id and delete operation of Blog
app.delete("/delete/:id", findByIdAndDeleteBlog)

// find by id and delete operation of User
app.delete("/delete/:id", findByIdAndDeleteUser)


app.listen(3000, function(){               //3000->port number,function()->callback function
    console.log("server has started at port 3000")
})



// login

app.post("/login", userLogin) 


