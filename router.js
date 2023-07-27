const fs = require('fs');

const requestServer = (req, res) =>{
    const url = req.url;
    const method = req.method;
    if(url === '/'){
        fs.readFile('./message.txt','utf-8',(err, data)=>{
            if(err){
                console.log(err);
                return res.end();
            }
            res.write(`
                <!doctype html>
                <html lang="en">
                <head>
                    <!-- Required meta tags -->
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

                    <!-- Bootstrap CSS -->
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">

                    <title>Hello, world!</title>
                </head>
                <body>
                    
                    <h1 class="mb-3">${data}</h1>

                    <form action="/message" method="POST">
                        <label for="message" class="form-group">Message : </label>
                        <input type="text" name="message" class="form-control w-25 d-inline">
                        <button type="submit" class="btn btn-info">Send</button>
                    </form>
                    <!-- Optional JavaScript -->
                    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.7/dist/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.3.1/dist/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
                </body>
                </html>`
            );
            return res.end();
        });
    
    }else if(url === "/message" && method === "POST"){
        const body = [];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=');
            message.shift();
            const modifiedMessage = message[0].split("+").join(" ");
            fs.writeFile("message.txt",modifiedMessage,(err)=>{
                err? console.log(err) : console.log('saved');
            });
        })
        res.statusCode = 302;
        res.setHeader('Location', '/')
        return res.end();
    }else{
        res.setHeader("Content-type","text/html");
        res.write("<h1>If you want to access form then change url to '/'</h1>");
        res.end();
    }
    
};

module.exports = requestServer;