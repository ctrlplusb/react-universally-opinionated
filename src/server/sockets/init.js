import bindIO from 'socket.io'

function initSockets (httpServer) {
  const io = bindIO(httpServer)

  // Fire up our socket listeners
  io.of('/todos').on('connection', (socket) => {
    console.log('==> Socket connected')
    setInterval(() => socket.emit('data', { hello: 'world' }), 2000)
    // socket.on('todos', data => console.log(data))
  })

  return io
}

export default initSockets
