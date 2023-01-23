const mongoose = require('mongoose') 
const blogSchema = new mongoose.Schema({
    Title:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    Body:{
        type:String,
        required:true,
        trim:true
    }
},{timestamps:true})

module.exports = mongoose.model('Blog', blogSchema)