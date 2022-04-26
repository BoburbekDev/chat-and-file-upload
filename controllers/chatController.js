const Chat = require('../models/Chat')

exports.historyChat = async(req, res) => {
    try {
        const chat = await Chat.find({
            $and: [
                { $or: [{receiver: req.query.receiver}, {receiver: req.query.sender}] },
                { $or: [{sender: req.query.receiver}, {sender: req.query.sender}] }
            ]
        }).sort({_id: 1})
        res.status(200).json(chat)
    } catch (error) {
        res.status(409).json(error)
    }
}

exports.sendFile = async(req, res) => {
    try {
        const chat = new Chat(req.body)
        await chat.save()
        res.status(201).json(chat)
    } catch (error) {
        res.status(409).json(error)
    }
}
