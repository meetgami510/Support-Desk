const express = require('express');
const router = express.Router()
const {getTickets,getTicket,createTickets, deleteTicket, updateTicket} = require("../controllers/ticketControler");

const {protect} = require("../middlerwar/authmiddlewar")


//if you want to get ticket then you need to be authenticated.
//here we call two function getTickets(in controller) && createTicket
router.route('/').get(protect, getTickets).post(protect,createTickets);

router.route('/:id').get(protect,getTicket).delete(protect,deleteTicket).put(protect,updateTicket);

module.exports = router