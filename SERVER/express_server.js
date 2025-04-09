const express = require('express');

const app = express();

app.get('/', (req, res) => {
    return res.send('Home Page..');
})

app.get('/about', (req, res) => {
    return res.send(`Hello  ${req.query.name}`);
})

app.listen(2000, () => console.log('Starting server..'));