const Blog = require("../models/blogModel")

exports.fetchBlog = async function(req,res){
    //response ma Blog table ma vako blog data send garnu paryo
    const data = await Blog.find()
    res.json({
        data : data
    })
}


exports.findBlogByIdAndRemoveSubtitle = async function(req,res){
    const data = await Blog.findById(req.params.id).select(["-subtitle"]) //tara remove subtitle of that id
    res.json({
       data : data
})
}

exports.updateBlogById = async function(req,res){
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
}

exports.publish = async function(req,res){
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
}


exports.findByIdAndDeleteBlog = async function(req,res){ 
    const id = req.params.id
    await Blog.findByIdAndDelete(id)
    res.json({
        message : "Blog with that id is deleted successfully !!"
    })
}