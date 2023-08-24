const express=require('express');
const socket=require('socket.io');

const app=express();
let server=app.listen(4000,()=>{
    console.log("Server started on port 4000");
});

app.use(express.static('public'));

let allClients = {};
const io=socket(server);

io.on('connection',function(socket){
    console.log("Contact light\nSocket id =", socket.id);

    socket.on('new-user-entered',function(data){
        console.log(data+" has joined")
        socket.broadcast.emit('new-user-entered',data);
        allClients[socket.id]=data;
    });
    socket.on('chat',function(data){
        socket.broadcast.emit('chat',data);
    });
    socket.on('typing',function(data){
        socket.broadcast.emit('typing',data);
    });
    socket.on('disconnect',()=>{   
        // console.log(allClients[socket.id]+" has left")      
        socket.broadcast.emit('left',allClients[socket.id])  
        delete allClients[socket.id];             
    });
});