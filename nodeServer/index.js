// node server which will handle socket io


const io = require('socket.io')(7000, {
 cors: {
  origin: '*',
 },
});

const users = {};


io.on('connection', socket => {
 //if any new user join the chat,let other user  connectes to the server know!
 socket.on('new-user-joined', name1 => {
  //console.log("new user", name1);
  users[socket.id] = name1;
  socket.broadcast.emit('user-joined', name1);
 });

 
//if someone send a message,broadcast it to other people
 socket.on('send', message => {
  socket.broadcast.emit('receive', { message: message, name1: users[socket.id] })
 });

 //if someone left to the chat,let other knows
 socket.on('disconnect', message => {
  socket.broadcast.emit('left', users[socket.id]);
  delete users[socket.id]
 });


})




