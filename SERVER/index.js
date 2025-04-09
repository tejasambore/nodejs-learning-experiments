const http  = require("http");
const fs = require("fs");
const url = require('url');
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send('Hello from Home Page..')
})

app.get('/about', (req, res) => {
    // return res.send('Hello from About Page..' + ' hey ' + req.query.name);
    return res.send(`Hello ${req.query.name}`);
})

function myHandler(req, res) {
    if (req.url == '/favicon.ico') return res.end();
    const log = `${Date.now()} : ${req.method} ${req.url} New Request Received\n`;
    const myUrl = url.parse(req.url, true);
    console.log(myUrl);

    fs.appendFile("log.txt", log, (err, data) => {
        switch(myUrl.pathname) {
            case "/":
                if (req.method == "GET")    
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
            case '/signup':
                if (req.method == 'GET')    res.end('This is an signup form');
                else if (req.method == 'POST') {
                    // DB Query
                    res.end('Success');
                }
            default:
                res.end("404 not found..");
        }
    })
}
// const myServer = http.createServer((req, res) => {
//     // console.log("New Request Received!")
//     // console.log(req);
//     // res.end("Hello from Server..!")
// })

// const myServer = http.createServer(myHandler);

// Handle using Express.js
const myServer = http.createServer(app);

myServer.listen(3000, () => console.log("Server Started..!"))