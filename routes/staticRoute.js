const express = require('express');
const URL = require('../model/url');
const router = express.Router();

//This is for home page.
router.get('/', async (req, res) => {
    if(!req.user) return res.redirect('/login');
    const allurls = await URL.find({ CreatedBy: req.user._id});
    return res.render('home.ejs', {
        urls: allurls,
    });    
});

//This is for signup page.
router.get('/signup', (req, res) => {
    return res.render('signup.ejs'); 
});

//This is for login page.
router.get('/login', (req, res) => {
        return res.render('login.ejs'); 
    });

module.exports = router;
