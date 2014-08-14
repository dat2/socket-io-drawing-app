var express = require('express');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('.'));

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('Disconneted!');
  });

  socket.on('chat.message', function(msg) {
    io.emit('chat.message.broadcast', msg);
  });

  socket.on('draw.up', function(point) {
    console.log(JSON.parse(point));
    io.emit('draw.down', point);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});