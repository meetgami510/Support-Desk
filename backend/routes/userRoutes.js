const express = require('express')
const router = express.Router()

const { registerUser,loginUser,getme} = require('../controllers/userControler');

const {protect} = require('../middlerwar/authmiddlewar')

router.post('/',registerUser)
router.post('/login',loginUser)
router.get('/me',protect,getme)

module.exports = router