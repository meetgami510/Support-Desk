const asyncHandler = require("express-async-handler");

const User = require('../models/usermodels');
const Ticket = require('../models/ticketmodels');


//------  Get User tickets
//@route -- GET   /api/tickets
//@access -- Private
const getTickets = asyncHandler(async (req,res)=> {

    //Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }

    const tickets = await Ticket.find({user: req.user.id})
    res.status(200).json(tickets);
})

//------  Get User ticket
//@route -- GET   /api/tickets/:id
//@access -- Private
const getTicket = asyncHandler(async (req,res)=> {

    //Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);
    
    if(!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() != req.user.id) {
        res.status(401);
        throw new Eroor('Not Autorized');
    }
    res.status(200).json(ticket);
})

// ---- Create New tickets
//@route POST   /api/tickets
//@access Private
const createTickets = asyncHandler(async (req,res)=> {
    console.log(req.body);
    const {product,description} = req.body;
    if(!product || !description) {
        throw new Error('please product and description');
    }

    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status:'new',
    })
    res.status(200).json(ticket);
})

//------  Delete ticket
//@route -- Delete   /api/tickets/:id
//@access -- Private
const deleteTicket = asyncHandler(async (req,res)=> {

    //Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);
    
    if(!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() != req.user.id) {
        res.status(401);
        throw new Eroor('Not Autorized');
    }

    await ticket.remove();
    res.status(200).json({success : true});
})

//------  Update ticket
//@route -- PUT   /api/tickets/:id
//@access -- Private
const updateTicket = asyncHandler(async (req,res)=> {

    //Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.id);
    
    if(!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() != req.user.id) {
        res.status(401);
        throw new Eroor('Not Autorized');
    }

    const updateTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body , {new : true});

    
    res.status(200).json(updateTicket);
})



module.exports = {
    getTickets,
    getTicket,
    createTickets,
    deleteTicket,
    updateTicket,
}