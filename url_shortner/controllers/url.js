const shortId = require('shortid');
const URL = require('../models/url');

const handleGenerateShortUrl = async (req, res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({ error: 'url is required' });

    const shortID = shortId.generate();
    await URL.create({
        shortId: shortID,
        redirectedURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    })

    return res.render('home', {
        id: shortID,
    })
    // return res.json({ id: shortID });
}

const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory,
    });
}

module.exports = {
    handleGenerateShortUrl,
    handleGetAnalytics,
}