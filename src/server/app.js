const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors'); // Add CORS for frontend-backend communication
const { createUser, checkUserExists, checkExistUser } = require('./models/user'); // Import models functions
const authController = require('./controllers/authController');
const doctorsControllers = require('./controllers/doctorsControllers');
const reserveController = require('./controllers/reserveController');
const { createDoctorTable } = require('./models/doctors');
const {Reservation} = require('./models/reserve');

Reservation();
createDoctorTable(); // ✅ Will run when you start the server

const app = express();
const port = 3001; // Change to 3001 to avoid port conflict with React frontend

// Middleware
app.use(cors()); // Allow requests from React frontend
app.use(express.urlencoded({ extended: false })); // To parse form data
app.use(express.json()); // Parse JSON data

// Serve static files from React build folder in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

// Login API
app.post('/api/login', authController.login);
// Signup API
app.post('/api/signup', authController.signup);
//Doctors API
app.get('/api/doctors',doctorsControllers.doctorsList);
//app.post('/api/doctors',);


//Reservation API
app.post('/api/reservation',reserveController.save);
app.get('/api/reservation/:userId', reserveController.getUserReservations);

// Start Server


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
