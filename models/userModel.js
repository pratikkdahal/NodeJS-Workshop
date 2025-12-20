const mongoose = require("mongoose")

const schema = mongoose.Schema //Schema is the class of Mongoose

const userSchema = new schema({
    name : String,
    email : String,
    password : String
}) //Schema is the class and we created a object of Schema class i.e. userSchema which is assigned to its constructor(instantation of class)

const User = mongoose.model("User",userSchema) //User vanne table banako with rules of userSchema containing field names like name,email,password and final user table is made
module.exports = User //exporting the user model to be used in other files