const socket=io.connect('http://localhost:4000/');

const output=document.querySelector('#output');
const message=document.querySelector('#message');
const button=document.querySelector('#send');
const feedback=document.querySelector('#feedback');

let naam="";
window.onload=function(){
   naam=prompt("Enter your name"); 
   socket.emit('new-user-entered',naam);
   output.innerHTML+="<p><em><b>You</b> have joined the chat</em></p>";
   const target=output.getElementsByTagName("p")[output.getElementsByTagName("p").length-1];
   target.className="right";
};

button.addEventListener('click',function(){
    socket.emit('chat',{
        message: message.value,
        handle: naam
    });
    output.innerHTML+='<p><strong>'+naam+':</strong>'+message.value+'</p>';
    const target=output.getElementsByTagName("p")[output.getElementsByTagName("p").length-1];
    // console.log(target);
    target.className="right";
    message.value="";
});

message.addEventListener('keypress',function(){
    socket.emit('typing',naam);
});


socket.on('new-user-entered',function(data){
    let k=document.getElementById('output');
    k.innerHTML+='<p><em><b>'+data+' </b>has joined the chat</em></p>';
});
socket.on('typing',function(data){
    feedback.innerHTML='<p><em>'+data+' is typing a message...</em></p>';
});
socket.on('chat',function(data){
    feedback.innerHTML="";
    output.innerHTML+='<p><strong>'+data.handle+':</strong>'+data.message+'</p>';
});
socket.on('left',function(data){
    output.innerHTML+='<p><em><strong>'+data+'</strong> has left the chat</em></p>';
})