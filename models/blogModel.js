const mongoose = require("mongoose")
const schema = mongoose.Schema

const blogSchema = new schema({
    title : String,
    subtitle : String,
    description : String
})

const Blog = mongoose.model("Blog", blogSchema)
module.exports = Blog