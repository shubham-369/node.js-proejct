const http = require('http');

const server = http.createServer((req, res) => {
    if(req.url == "/"){
        res.end("Hello there");
    }else if(req.url == "/home"){
        res.end("<h1>Welcome to homepage</h1>");
    }else if(req.url == "/about"){
        res.end("<h1>Welcome to about us page</h1>");
    }else if(req.url == "/node"){
        res.end("<h1>Welcome to the Node.js project</h1>");
    }else{
        res.writeHead(404,{"Content-type" : "text/Html"});
        res.end("<h1>404 error page doesn't exist</h1>");
    }
});

server.listen(4000,'127.0.0.1',() =>{
    console.log('it is working');
});