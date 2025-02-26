//this is used when we are on stateless position where data can not be stored.
// const sessionIdToUserMap = new Map();

//Now we are using stateful position where we store data by generating a key by using JWT (json web token). this is nothing but a data in a encrypted form.
const jwt = require('jsonwebtoken');
const secret = 'Vanisher@123$10M';


//const setUser = (id, user) --- in statefull posi. we dont need id of the user
const setUser = (user) => {
    // sessionIdToUserMap.set(id, user);     ---No need now only while we are on stateless posi.
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
    }, 
    secret);
}


//Now add token that we created from controller/user.js
const getUser = (token) => {
    if(!token) return null;
    try{
        return jwt.verify(token, secret);
    }catch (error){
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser,
}