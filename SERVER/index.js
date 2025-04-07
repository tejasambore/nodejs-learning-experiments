const http  = require("http");
const fs = require("fs");
const url = require('url');

const myServer = http.createServer((req, res) => {
    if (req.url == '/favicon.ico') return res.end();
    const log = `${Date.now()} : ${req.url} New Request Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname) {
            case "/":
                res.end("Hello from Server..!\n HomePage");
            break;
            case "/about":
                const username = myUrl.query.myname;
                res.end(`Hi, ${username} from Server..!\n About Page`);
            break;
            case "/contact":
                res.end("Contact Page");
            break;
            case "/search":
                const search = myUrl.query.search_query;
                res.end("Here's your result for " + search);
            break;
            default:
                res.end("404 not found..");
        }
    })
    // console.log("New Request Received!")
    // console.log(req);
    // res.end("Hello from Server..!")
})

myServer.listen(3000, () => console.log("Server Started..!"))