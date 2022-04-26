const mongoose = require('mongoose')
const chatSchema = new mongoose.Schema({
    message: {
        type: String,
        trim: true,
        required: true
    }, 
    sender: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    },
    receiver: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
    }
},{
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Chat', chatSchema)