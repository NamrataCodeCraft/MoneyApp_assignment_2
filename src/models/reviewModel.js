const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId
const reviewSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: 'User'
    },
    description: {
        type: String,
        required: true
    }

},{timestamps:true})

module.exports = mongoose.model('Review', reviewSchema)