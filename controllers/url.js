const { nanoid } = require('nanoid');
const URL = require('../models/url');


async function handleGenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'Url is required' })
    const shortId = nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    })
    
    return res.render('home', {
        id: shortId
    })
    //here we send the json response but we want render a ui so
    // return res.json({ id: shortId })
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    console.log(result.visitHistory);
    
    return res.json({ totalClicks : result.visitHistory?.length || 0, analytics: result.visitHistory || []})
}


module.exports = {
   handleGenerateNewShortURL, 
    handleGetAnalytics,
}







