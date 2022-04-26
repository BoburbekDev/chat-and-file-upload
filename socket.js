const users = {};
const Chat = require('./models/Chat')
module.exports.sockets = (io) => {
    io.sockets.on("connection", (socket) => {
        socket.on('sendInfo', (user) => {
            users[user._id] = socket.id
        })
        socket.on('message', async(Obj) => {
            try {
                const chat = await new Chat(Obj)
                await chat.save()
                io.to(users[Obj.sender]).emit('message', chat);
                io.to(users[Obj.receiver]).emit('message', chat);
            } catch (error) {
                console.log(error)   
            }
        })
    })
}