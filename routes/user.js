const express = require('express');
const { handleUserSignUps, handleUserLogin } = require('../controller/user.js');
const router = express.Router();

// router.get('/signup', (req, res) => { // Fixed parameter order
//     console.log('Sign Up Log rendering...');
//     return res.render('signup.ejs');
// });

router.post('/signup', handleUserSignUps);
router.post('/login', handleUserLogin);

module.exports = router;
