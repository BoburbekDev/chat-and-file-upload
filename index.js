const express = require('express')
const app = express()
const session = require('express-session');
const http = require('http')
const socketio = require('socket.io')

const server = http.createServer(app)
const io = socketio(server,{
    cors: {
        methods: ["GET", "POST"]
    }
})

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
}));

require("./db/db");
require("./middlewares/middleware").useMiddlewares(express, app);


require("./socket.js").sockets(io);

const port = process.env.PORT || 8001;
server.listen(port, () => console.log(`Listening port on ${port}`));