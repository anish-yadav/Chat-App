const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const MessageSchema = new mongoose.Schema({
    text:String,
    timestamp:Number,
    from:String
})

var Message = module.exports = mongoose.model('Message',MessageSchema)

module.exports.MessageSchema = MessageSchema