const http = require('http');
const hostname = '127.0.0.1';
const port = 3000;


/*
    애로우 함수 
    (req, res) => {} 
    function(req,res) {}
*/
const server = http.createServer((req, res) => {

    console.log(req.url);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/palin');
    res.end('Hello Wold');
});

server.listen(port, hostname, ()=>{
    console.log(`server running at http://${hostname}:${port} ~~~ `);
});