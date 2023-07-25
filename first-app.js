const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Hello node.js");
});

server.listen(4000,'127.0.0.1',() =>{
    console.log('it is working');
});