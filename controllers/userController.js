const User = require('../models/User')

exports.register = async(req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json({...user._doc, password: undefined})
    } catch (error) {
        res.status(409).json(error)
    }
}

exports.login = async(req, res) => {
    try {
        console.log('shu yerda ekan')
        const user = await User.findOne({login: req.body.login})
        if(user) {
            if(user.correctPassword(req.body.password, user.password)) {
                return res.status(200).json({...user._doc, password: undefined})
            } 
            return res.status(400).json({msg: "User not found"})
        }
        return res.status(400).json({msg: "User not found"})
    } catch (error) {
        res.status(409).json(error)
    }
}