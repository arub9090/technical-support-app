const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Ticket = require("../model/ticketModel");
const Note= require('../model/noteModel')


//get Notes for a Ticket
//Route-- GET /api/tickets/:ticketID/notes
//access- private route

const getNotes = asyncHandler(async (req, res) => {
  //get user from the Json Web token
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found Here");
  }

  // as we set our Ticket Schema there
  const ticket = await Ticket.findById(req.params.ticketId);
  if(ticket.user.toString() !== req.user.id){
      res.status(401);
      throw new Error('User Not Authorized')
  }

  const notes= await Note.find({ticket: req.params.ticketId })
  res.status(200).json(notes);
});



//@desc- Create Ticket Note
//Route-- POST /api/tickets/:ticketID/notes
//access- private route

const addNote = asyncHandler(async (req, res) => {
    //get user from the Json Web token
    const user = await User.findById(req.user.id);
  
    if (!user) {
      res.status(401);
      throw new Error("User Not Found Here");
    }
  
    // as we set our Ticket Schema there
    const ticket = await Ticket.findById(req.params.ticketId);
    if(ticket.user.toString() !== req.user.id){
        res.status(401);
        throw new Error('User Not Authorized')
    }
  
    const note= await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id,
     })
    res.status(200).json(note);
  });


module.exports= {
    getNotes,
    addNote
}