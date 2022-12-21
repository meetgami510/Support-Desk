const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User =  require('../models/usermodels') 

//here /api/users/me --- making the authorisation to make the token 
// through token we get our user_id --- 

const protect = asyncHandler(async (req,res,next)=> {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try{
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select('-password');
            next()
        }catch(error) {
            console.log(error)
            res.status(400)
            throw new Error('Not authorized')
        }
    }
    if(!token) {
        res.status(400)
        throw new Error('Not authorized')
    }
})

module.exports = {protect}