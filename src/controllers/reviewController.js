const mongoose = require('mongoose')
const reviewModel = require('../models/reviewModel')
const userModel = require('../models/userModel')

exports.createReview = async function(req,res) {
    try{
        const {userId, description} = req.body
        if(!userId) return res.status(400).send({status:false, msg:'enter userid'})
        if(!mongoose.isObjectIdOrHexString(userId)) return res.status(400).send({status:false, msg:"userid is invalid"})
        if(!description) return res.status(400).send({status:false, msg:"please fill description"})
        const userCheck = await userModel.findOne({userId})
        if(!userCheck) return res.status(404).send({status:false, msg:"user not found with this id"})

        const data = await reviewModel.create(req.body)
        return res.status(201).send({status:true, msg:data})

    }catch(err) {
        return res.status(500).send({status:false, msg:err.message})
    }
}

exports.deleteReviwe = async function (req, res) {
    try {
        const reviweID = req.params.id;
        if (!mongoose.isValidObjectId(reviweID)) return res.status(400).send({ status: false, msg: "invalid review id" })
        if (!reviweID) return res.status(400).send({ status: false, msg: "userId is required" })
        const reviwe = await reviewModel.findOne({ _id: reviweID })
        if (!reviwe) return res.status(404).send({ status: false, msg: "Review not found or already deleted " })

        await reviewModel.findByIdAndDelete(reviweID)

        return res.status(200).send({ status: true, msg: 'congrats Reiew Deleted' })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}