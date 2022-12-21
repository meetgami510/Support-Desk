const asyncHandler = require('express-async-handler')
//this is required to take error from globle stage.
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/usermodels')

//Register user part :

const registerUser = asyncHandler(async (req,res)=>{

    const {name,email,password} = req.body
    if(!name || !email || !password) {

        //if multiple respond are there so we need to put return statement
        //it post the Status_code=400 and in form of json file.
        // return res.status(400).json({message: 'please include all fields'})

        //it give error in form of html
        res.status(400);
        throw new Error('please include all fields')
    }

    //Find if user already exists
    const userExits = await User.findOne({email});
    if(userExits) {
        res.status(400)
        throw new Error('User already exists')
    }

    //Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt)

    //create user
    const user = await User.create({
        name,
        email,
        password:hashPassword
    })

    if(user) {
        //it give the data in form of json at status of 201
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token: generateToken(user._id)
        })
    }else{
        res.status(400)
        throw new Error('Invalid user data');
    }
})


//Login part:

const loginUser = asyncHandler( async(req,res)=>{
    //destructor the req.body
    const {email,password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error('please include all fields')
    }
    const user = await User.findOne({email});

    //check user and password
    if(user && (await bcrypt.compare(password,user.password))) {
        res.status(200).json({
            _id:user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }else {
        res.status(401)
        throw new Error('Invalid credentials');
    }
    console.log(req.body);
    // res.send('login Route');
})

//  get current user
// /api/users/me

const getme = asyncHandler(async (req,res)=>{
    const user = {
        id:req.user._id,
        email:req.user.email,
        name:req.user.name
    }
    res.status(200).json(user);
})

//generate token : (whay because we can get user_id from that token)
const generateToken = (id) =>{
    return jwt.sign({ id },process.env.JWT_SECRET,{
        //expire in 30 day for token
        expiresIn: '30d',
    })
}

module.exports = {registerUser , loginUser,getme} 