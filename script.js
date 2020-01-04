
function makeSocket(){
  const socket=new WebSocket("ws://localhost:3001");
  socket.addEventListener('open',function(event){
    socket.send('Hello from remote!');
  });
  socket.addEventListener('message',function(event){
    log('Message from server',event.data);
    socket.send("got it!");
  });
}
function log(msg){
  area=document.getElementById("log");
  var d=new Date();
  area.innerHTML=`${area.innerHTML}\n${d.getHours()}:${d.getMinutes()}\=>${msg}`;
}
var notificationIndex=0;
function error(msg){
  var element=$(`
  <div class="ui-widget">
  <div class='ui-state-error ui-corner-all' style='padding: 0 .7em;'>
	<p><span class='ui-icon ui-icon-alert' style='float: left; margin-right: .3em;'></span>
  <span class='ui-icon ui-icon-closethick'id="message${notificationIndex}" style='float:right;'></span>
  <strong>Error: </strong>${msg}</p>
  </div></div>
  `);

  $("#Notifications").append(element);
  $(`#message${notificationIndex}`).click(function(){
    console.log(`Close Button Clicked closing message${notificationIndex}`);
    $(this).parent().parent().slideUp();
  });
  notificationIndex++;

}
function notify(msg){
  var element=$(`
  <div class="ui-widget">
  <div class='ui-state-highlight ui-corner-all' style='padding: 0 .7em;'>
	<p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em;'></span>
  <span class='ui-icon ui-icon-closethick'id="message${notificationIndex}" style='float:right;'></span>
  <strong>Note: </strong>${msg}</p>
  </div></div>
  `);

  $("#Notifications").append(element);
  $(`#message${notificationIndex}`).click(function(){
    $(this).parent().parent().slideUp();
  });
  notificationIndex++;
}
$(document).ready(function(){
  log("Page Ready");
  error("This is an example error");
  notify("This is an example notification");

});
