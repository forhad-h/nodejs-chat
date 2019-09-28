const express = require('express')
const http = require('http')
const socketIo = require('socket.io')

const app = express()

const server = http.Server(app)

const io = socketIo(server)

app.use(express.static(`${__dirname}/public`))

app.get('/', (req, res) => {
  res.render('index.ejs')
})

io.sockets.on('connection', socket => {
  socket.on('username', username => {
    socket.username = username
    io.emit('is_online', `🔵 <i>${socket.username} join the chat...`)
  })

  socket.on('disconnect', () => {
    io.emit('is_online', `🔴 <i>${socket.username} left the chat..`)
  })

  socket.on('chat_message', message => {
    io.emit('chat_message', `<strong>${socket.username}: </strong> ${message}`)
  })
})

server.listen(8080, () => {
  console.log('server running 🚀  on http://localhost:8080')
})
