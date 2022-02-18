const asyncHandler = require("express-async-handler");
const User = require("../model/userModel");
const Ticket = require("../model/ticketModel");

//get Current User tickets
//Route-- GET /api/tickets
//access- private route

const getTickets = asyncHandler(async (req, res) => {
  //get user from the Json Web token
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found Here");
  }

  // as we set our Ticket Schema there
  const tickets = await Ticket.find({ user: req.user.id });

  res.status(200).json(tickets);
});

//get Current Users Specific Ticket
//Route-- GET /api/tickets/:ticketId
//access- private route

const getTicket = asyncHandler(async (req, res) => {
  //get user from the Json Web token
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // as we set our Ticket Schema there
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket Not Found");
  }

  if (ticket.user.toString() !== req.user.id) {
    console.log(ticket.user.toString(), req.user.id )
    res.status(401);
    throw new Error("Not Authorized");
  }
  res.status(200).json(ticket);
});

//Create a new ticket
//Route-- POST /api/tickets
//access- private route

const createTicket = asyncHandler(async (req, res) => {
  const { product, description } = req.body;

  if (!product || !description) {
    res.status(401);
    throw new Error("Please add Description of the Product");
  }

  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found Here");
  }

  const ticket = await Ticket.create({
    user: req.user.id,
    product,
    description,
    status: "new",
  });

  res.status(201).json(ticket);
});

//Delete Current Users Specific Ticket
//Route-- DELETE /api/tickets/:ticketid
//access- private route

const deleteTicket = asyncHandler(async (req, res) => {
  //get user from the Json Web token
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // as we set our Ticket Schema there
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket Not Found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  await ticket.remove();
  res.status(200).json({ success: true });
});

//Update Current Users Specific Ticket
//Route--PUT /api/tickets/:ticketid
//access- private route

const updateTicket = asyncHandler(async (req, res) => {
  //get user from the Json Web token
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User Not Found");
  }

  // as we set our Ticket Schema there
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    res.status(401);
    throw new Error("Ticket Not Found");
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedTicket);
});

module.exports = {
  getTickets,
  createTicket,
  getTicket,
  deleteTicket,
  updateTicket,
};
