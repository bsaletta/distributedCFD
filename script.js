document.getElementById('button').addEventListener("click",makeSocket);
function makeSocket(){
  const socket=new WebSocket("ws://localhost:3001");
  socket.addEventListener('open',function(event){
    socket.send('Hello from remote!');
  });
  socket.addEventListener('message',function(event){
    console.log('Message from server',event.data);
    socket.send("got it!");
  });
}
