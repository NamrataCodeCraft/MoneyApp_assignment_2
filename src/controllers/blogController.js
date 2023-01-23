const { default: mongoose } = require('mongoose')
const blogModel = require('../models/blogModel')

 exports.createBlog = async function(req,res) {
    try{
        const {Title, Body} = req.body
        if(Object.keys(req.body).length ==0) return res.status(400).send({status:false, msg:'Please mention some data'})
        if(!Title) return res.status(400).send({status:false, msg:"Title is required"})
        if(!Body) return res.status(400).send({status:false, msg:"Body is required"})
        const checkTitle = await blogModel.findOne({Title})
        if(checkTitle) return res.status(400).send({status:false, msg:"Title already present. Choose another"})

        const data = await blogModel.create(req.body)
        return res.status(201).send({status:true, msg:data})

    }catch(err) {
        return res.status(500).send({status:false, msg:err.message})
    }
}

exports.getAllBlogs = async function(req,res) {
    try{
        const data = await blogModel.find()
        return res.status(200).send({status:true, msg:data})

    }catch(err) {
        return res.status(500).send({status:false, msg:err.message})
    }
}

exports.getBlogById = async function(req,res) {
    try{
        const blogId = req.params.blogId
        if(!blogId) return res.status(400).send({status:false, msg:"blog Id is required"})
        if(!mongoose.isValidObjectId(blogId)) return res.status(400).send({status:false, msg:"Invalid blog Id"})
        const checkBlog = await blogModel.findById(blogId)
        if(!checkBlog) return res.status(404).send({status:false, msg:"blog not found"})
        return res.status(200).send({status:true , msg: checkBlog}) 

    }catch(err) {
        return res.status(500).send({status:false, msg:err.message})
    }
}

exports.updateBlog = async function(req,res) {
    try{
        const blogId = req.params.blogId
        if(!blogId) return res.status(400).send({status:false, msg:"blogId is required for updation"})
        if(!mongoose.isValidObjectId(blogId)) return res.status(400).send({status:false, msg:"invalid BlogId😒"})
        const dbData = await blogModel.findById(blogId)
        if(!dbData) return res.status(404).send({status:false, msg:"blogId not found😢"})
        const updateData = await blogModel.findByIdAndUpdate(blogId, req.body, {new:true})
        return res.status(200).send({status:true ,data:updateData})

    }catch(err) {
        return res.status(500).send({status:false, msg:err.message})
    }
}

exports.deleteBlog = async function(req,res) {
    try{
        let blogId = req.params.blogId
        if(!blogId) return res.status(400).send({status:false , msg:"blogId is required in params"})
        if(!mongoose.isValidObjectId(blogId)) return res.status(400).send({status:false, msg:"invalid blogId😒"})
        const checkBlog = await blogModel.findByIdAndDelete(blogId)
        if(!checkBlog) return res.status(400).send({status:false, msg:'blog already deleted'})
       
      return res.status(200).send({status:true, msg:'congrats, blog deleted', data :checkBlog})



    }catch(err){
        return res.status(500).send({status:false, msg:err.message})
    }
}


