// Backend where the communications with DAtabase and Client-side happens through Express Middleware //
const cors = require('cors');
const express = require('express');
const next = require('next');
const bodyParser = require('body-parser');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const prisma = new PrismaClient();

const PORT = 5001;

app.prepare().then(() => {
  const server = express();

// Enableing body parsing middleware to handle JSON requests //
server.use(bodyParser.json());  

// Enabling CORS for route 3000 only //
   server.use(cors({
    origin: 'http://localhost:3000'
   }));

///////////////////////////////// RESERVE MATCH START //////////////////////////////////
server.post('/reserve', async (req, res) => {
  const { matchId, userId, userEmail, username } = req.body;
  
  try {
    // Create the reservation
    const reservation = await prisma.reservation.create({
      data: {
        match_id: matchId,
        user_id: userId,
        username: username,
        email: userEmail,
      },
    });

    // Fetch the current available_slots and status of the match
    const match = await prisma.match.findUnique({
      where: { id: matchId },
      select: { available_slots: true, status: true },
    });

    // Check if the match exists
    if (!match) {
      return res.status(404).json({ error: 'Match not found' });
    }
    if (match.available_slots <= 0) {
      return res.status(400).json({ error: 'No available slots' });
    }

    // Update the match's available_slots and status
    const updatedMatch = await prisma.match.update({
      where: { id: matchId }, // Use the correct match ID
      data: {
        available_slots: match.available_slots - 1, // Manually decrement available_slots by 1
        status: match.available_slots - 1 === 0 ? 'sold out' : match.status, // Set status to 'sold out' if no slots left
      },
    });

    res.status(200).json({ message: 'Seat reserved successfully!', reservation, updatedMatch });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to reserve seat' });
  }
});

///////////////////////////////// RESERVE MATCH ENDS //////////////////////////////////   

///////////////////////////////////////////// SAVE SIGNUP USER DATA START ////////////////////////////////////
server.post('/saveUserData', async (req, res) => {
  try {
    const { user } = req.body;

    // Validating the input data //
    if (!user.userId || !user.email || !user.firstName || !user.lastName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Saving user in database //
    const savedUser = await prisma.users.create({
      data: {
        userId: user.userId,           
        email: user.email,             
        name: user.firstName,     
        username: user.username,
        createdAt: new Date()
      },
    });

    // Responding with the created user data //
    res.status(201).json(savedUser);
  } catch (error) {
    console.error('Error saving user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
///////////////////////////////////////////// SAVE SIGNUP USER DATA ENDS ////////////////////////////////////

///////////////////////////////////////////// DELETE USER DATA START ////////////////////////////////////
server.delete('/deleteUser/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if the user exists
    const user = await prisma.users.findUnique({
      where: { userId },
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Delete the user
    await prisma.users.delete({
      where: { userId },
    });

    // Respond with success message
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
///////////////////////////////////////////// DELETE USER DATA ENDS ////////////////////////////////////

////////////////////////////////// ADD MATCH FOR ADMIN STARTS ///////////////////////////
server.post('/AddMatches', async (req, res) => {
  const { match_name, date, location, teams, available_slots, status } = req.body;
  try {
    const match = await prisma.match.create({ 
      data: {
        match_name,
        date: new Date(date),
        location,
        teams,
        available_slots: parseInt(available_slots, 10),
        status, 
      },
    });
    res.status(200).json({ message: 'Match added successfully!', match });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add match' });
  }
});
////////////////////////////////// ADD MATCH FOR ADMIN ENDS /////////////////////////////

////////////////////////////////// UPDATE MATCH STARTS ////////////////////////////////////
server.put('/matches/:id', async (req, res) => {
  const { id } = req.params;
  const { match_name, date, location, teams, available_slots, status } = req.body;
  console.log("eeeeeeeee", req.params, match_name, date, location, teams, available_slots, status)
  try {
    const upMatch = await prisma.match.update({
      where: { id: Number(id) },
      data: { 
        match_name, 
        date: new Date(date), 
        location,
        teams, 
        available_slots: parseInt(available_slots, 10), 
        status },
        
    }); 
    res.status(200).json({ message: 'Match updated successfully!', upMatch });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update match' });
  }
});
////////////////////////////////// UPDATE MATCH ENDS ////////////////////////////////////

////////////////////////////////// DELETE MATCH STARTS //////////////////////////////////
// server.delete('/matches/:id', async (req, res) => {
//   const { id } = req.params;
//   try {
//     await prisma.match.delete({ 
//       where: { id: Number(id) } 
//     });
//     res.status(200).json({ message: 'Match deleted successfully!' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to delete match' });
//   }
// });

////////////////////////////////// DELETE MATCH ENDS //////////////////////////////////

////////////////////////////// USER GET MATCHES FROM DATABASE START /////////////////////////////
server.get('/matches', async (req, res) => {
  try {
    const matches = await prisma.match.findMany({
      where: { status: 'Available' }, // Fetch only available matches
    });
    console.log('erfurjfujr4uf',matches)
    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve matches' });
  }
});
//////////////////////////// USER GET MATCHES FROM DATABASE ENDS ////////////////////////

/////////////////////////// ADMIN GET MATCHES FROM DATABASE START ////////////////////////
server.get('/adminMatches', async (req, res) => {
  try {
    const matches = await prisma.match.findMany();
    res.status(200).json(matches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve matches' });
  }
});
////////////////////////////ADMIN GET MATCHES FROM DATABASE ENDS ////////////////////////




  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Starting the Express server //
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
