const mongoose = require("mongoose")

async function dbConnect(){
    await mongoose.connect(process.env.CONNECTION_STRING) //jahile pani process.env. lekhnai parcha ani .env ma k lekheko cha tyo pachadi lekhne
    console.log("Database connected successfully!!")
}

module.exports = dbConnect

//this function is of no use unless it is imported and called in app.js, this should be exported first and should be imported and called in app.js
//for exporting function in nodejs : module.exports = export-garne-function