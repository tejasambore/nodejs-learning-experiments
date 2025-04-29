const express = require('express');
const { connectDB } = require('./connection');
const urlRoute = require('./routes/url');
const URL = require('./models/url');

const app = express();
const PORT = 8002;

connectDB('mongodb://127.0.0.1:27017/short-url')
    .then(() => console.log("MongoDB Connected..!"));

app.use(express.json());

app.use('/url', urlRoute);

app.get('/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        { shortId: shortId, }, 
        { $push: { visitHistory: { timestamp: Date.now() } } }
    )
    res.redirect(entry.redirectedURL);
})

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
