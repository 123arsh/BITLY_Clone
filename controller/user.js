const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../service/auth');
const User = require('../model/user.js');
// const { set } = require('mongoose');
const handleUserSignUps = async (req, res) => {
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password,
    });
    // return res.render('home.ejs');

    return res.redirect('/');
}

const handleUserLogin = async (req, res) => {
    const {email, password} = req.body;
    const userdetail = await User.findOne({email, password});
    if(!userdetail){
        console.log('Invalid email or password Try again with correct email and password');
        return res.render('login.ejs', {
            error: 'Invalid Username or password.'
        });
    }

    //session ID require while we are on stateless posi.
    // const sessionid = uuidv4();

    //But as we are on statefull posi. we going to get the jwt from service/auth.js and use it here.
    //Now we dont need sessionid so remove it from the setUser(sessionid, userdetail)
    const token = setUser(userdetail);

    //Add token in place of sessionid.
    res.cookie('uuid',token);
    return res.redirect('/');
}

module.exports = {
    handleUserSignUps,
    handleUserLogin,
}