const { timeStamp } = require('console')
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name'],
    },
    email: {
        type:String,
        required:[true,'please add a email'],
    },
    password: {
        type:String,
        required:[true,'please add a password']
    },
    isAdmin: {
        type:Boolean,
        required:true,
        default:false,
    }
},{timeStamp:true})


module.exports = mongoose.model('User',userSchema)