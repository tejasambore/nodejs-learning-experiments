const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { restrictToLoggedinUserOnly, checkAuth } = require('./middleware/auth');
const { connectDB } = require('./connection');

const URL = require('./models/url');

const urlRoute = require('./routes/url');
const staticRoute = require('./routes/staticRouter');
const userRoute = require('./routes/user');

const app = express();
const PORT = 8002;

connectDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("MongoDB Connected..!"));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.get('/test', async (req, res) => {
//     const allUrls = await URL.find({});
//     // return res.end("<h1> Hey from Server..</h1>");
//     return res.render('home', {
//         urls: allUrls,
//     })
// })

app.use('/url', restrictToLoggedinUserOnly, urlRoute);
app.use('/', checkAuth, staticRoute);
app.use('/user', userRoute);

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId: shortId, }, 
        { $push: { visitHistory: { timestamp: Date.now() } } }
    )
    res.redirect(entry.redirectedURL);
})

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
