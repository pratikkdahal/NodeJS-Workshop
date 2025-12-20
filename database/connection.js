const mongoose = require("mongoose")

async function dbConnect(){
    await mongoose.connect("mongodb+srv://081bct050_db_user:nodejsworkshop@cluster0.zg7xhvq.mongodb.net/?appName=Cluster0")
    console.log("Database connected successfully!!")
}

module.exports = dbConnect

//this function is of no use unless it is imported and called in app.js, this should be exported first and should be imported and called in app.js
//for exporting function in nodejs : module.exports = export-garne-function