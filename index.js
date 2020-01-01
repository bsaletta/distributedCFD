const http= require('http');
const fs =require('fs');
const url =require('url');
const WebSocket = require('ws');

const hostname ='127.0.0.1';
const port = 3000;

const server = http.createServer((req,res)=>{
  req.on('error',(err)=>{
    console.error(err);
    res.statusCode=400;
    res.end(err);
  });
  res.on('error',(err)=>{
    console.error(err);
  });
  var path=req.url.substr(1);
  if(req.url==="/") path="index.html";
  var suffix=path.substr(path.indexOf('.'));
  if(fs.existsSync(path)){
    res.statusCode=200;
    const stream=fs.createReadStream(path);
    switch (suffix) {
      case '.html':
        res.setHeader('Content-Type','text/html');
        break;
      case '.js':
        res.setHeader('Content-Type','text/javascript');
        break;
      case '.css':
        res.setHeader('Content-Type','text/stylesheet');
        break;
      default:
        res.setHeader('Content-Type','application/octet-stream');
    }
    stream.pipe(res);
    stream.on('end',()=>{
      res.end();
    });
  }else{
    res.statusCode=404;
    res.end();
  }

});

server.listen(port, hostname, ()=>{
  console.log(`Server running at http://${hostname}:${port}`);
});


const wss = new WebSocket.Server({port:3001})

wss.on('connection',(ws)=>{
  ws.on('message',(message)=>{
    console.log(`Recieved message => ${message}`);
    ws.send('Herro');
  });
  ws.send('What Up!!');
});
