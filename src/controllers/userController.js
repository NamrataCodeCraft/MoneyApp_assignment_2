const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
exports.createUser = async function(req,res) {
    try{
        const {name, email, password, phone} = req.body
        if(!name) return res.status(400).send({status:false, msg:"name is required"})
        if(!email) return res.status(400).send({status:false, msg:"email is required"})
        if(!password) return res.status(400).send({status:false, msg:"password is required"})
        const checkPhone = await userModel.findOne({phone})
        if(checkPhone) return res.status(400).send({status:false, msg:"phone already registered."})
        
        const Data = await userModel.create(req.body)
        return res.status(201).send({status:false, msg:Data})

    }catch(err) {
        return res.status(500).send({status:false, msg:err.message})
    }
}
exports.login = async function(req,res) {
    try{
        const {email, password} = req.body
        if(!email) return res.status(400).send({status:false, msg:"please fill email "})
        const check = await userModel.findOne({email, password})
        if(!check) return res.status(400).send({status:false, msg:"opps! login password did not match"})
        const token = jwt.sign({id:check._id}, 'Assignment_2')
        return res.status(200).send({status:true, msg:"Login Succssful", token})
    }catch(err) {
        return res.status(500).send({status:false, msg: err.message})
    }
}