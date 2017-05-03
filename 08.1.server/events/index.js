

module.exports = io => {
  io.on('connection', function(socket){
    console.log('a user connected')
    socket.on('disconnect', function(){
      console.log('user disconnected')
    })
  })

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      console.log('message: ' + msg)
    })
  })

  io.on('connection', function(socket){
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    })
  })
}
