const { instrument } = require("@socket.io/admin-ui")
const io = require('socket.io')(3000, {
    cors: {
        origin: ['http://localhost:5173',
                 'http://localhost:5174',
                 'http://localhost:5175',
                 'https://admin.socket.io'],
        credentials: true,
    }
})

const userIo = io.of('/user')
userIo.on('connection', socket => {
    console.log('connected to user namespace with username ' + socket.username)
})

userIo.use((socket, next) => {
    if (socket.handshake.auth.token) {
        socket.username = getUserameFromToken(socket.handshake.auth.token)
        next()
    } else {
        next(new Error("Please send token"))
    }
})

function getUserameFromToken(token) {
    // In a real application, you would verify the token and extract the username
    return token
}

io.on('connection', socket => {
    console.log(socket.id)
    socket.on('custom-event', (number, string, obj) => {
        console.log(number, string, obj)
    })
    socket.on('send-message', (message, room) => {
        if(room === '') {
            socket.broadcast.emit("receive-message", message) // send to all except sender
            // io.emit("receive-message", message) // send to all including sender
        }
        else {
            socket.to(room).emit("receive-message", message) // send to all in room except sender
        }
    })
    socket.on('join-room', (room, callback) => {
        socket.join(room)
        callback(`You joined the room: ${room}`)
    })
    socket.on('ping', n => console.log(n))
})

instrument(io, {
    auth: false,
})