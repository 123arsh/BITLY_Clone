const { getUser } = require('../service/auth.js');
const redirectToLoggedInUserOnly = async (req, res, next) => {
    const userUid = req.cookies?.uuid;
    if(!userUid) return res.redirect('/login');

    const user = getUser(userUid);
    if(!user) return res.redirect('/login');

    req.user = user;
    next();
}

const checkAuth = async (req, res, next) => {
    const userUid = req.cookies?.uuid;

    const user = getUser(userUid);

    req.user = user;
    next();
}
module.exports = {
    redirectToLoggedInUserOnly,
    checkAuth,
}

