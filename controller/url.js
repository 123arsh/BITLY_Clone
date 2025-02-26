const shortId = require('shortid');
const URL = require('../model/url');

const handleGenerateShortNewURL = async (req, res) =>{
    const body = req.body;
    console.log(body);
    if(!body.url) return res.status(400).json({Error: 'URL is Required'});
    const shortID = shortId();

    await URL.create({
        shortId: shortID, 
        redirectURL: body.url,
        visitHistory: [],
        CreatedBy: req.user._id,
    });
    return res.render('home.ejs', {
        id: shortID 
    })
    // return res.json({ id: shortID });
}

const handleShortIdAnalytics = async (req, res) =>{
    const shortid = req.params.shortId;
    const result = await URL.findOne({ shortId: shortid }); // ✅ Correct field name
    return res.json({ totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
     });
}

module.exports = {
    handleGenerateShortNewURL,
    handleShortIdAnalytics,
};