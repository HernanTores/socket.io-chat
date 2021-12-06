require('dotenv')
const express = require('express')
const app = express()
const http = require('http')
const {Server} = require('socket.io')

const server = http.createServer(app)

const io = new Server(server)

app.use(express.static('./public'))

let users = 0

io.on('connection', (socket) => {
    socket.on('message', (msg) => {
        io.emit('message', msg)
    })
    users++;
    io.sockets.emit('broadcast',{ description: users + ' users connected!'});
    socket.on('disconnect', function () {
        users--;
        io.sockets.emit('broadcast',{ description: users + ' users connected!'});
   })
})


const port = process.env.PORT || 3000

server.listen(port, console.log(`Server listening on port: ${port}`))