const http = require('http');

const myServer = http.createServer((req, res) => {
    console.log("New Req Received..!");
    res.end("Hello from Server...")
})

myServer.listen(3000, () => console.log('Server Started..'));