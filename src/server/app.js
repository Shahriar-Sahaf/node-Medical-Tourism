

// const express = require('express');
// const path = require('path');
// const hbs = require('hbs');
// const bcrypt = require('bcryptjs');
// const { createUser, checkUserExists,checkExistUser  } = require('./user'); // Import database functions




// const app = express();

// // Define paths
// const pathWeb = path.join(__dirname, '../publics');
// const pathViews = path.join(__dirname, '../templates/views');
// const partialsViews = path.join(__dirname, '../templates/partials');

// // Set up Handlebars
// app.set('view engine', 'hbs');
// app.set('views', pathViews);
// hbs.registerPartials(partialsViews);

// // Middleware
// app.use(express.static(pathWeb));
// app.use(express.urlencoded({ extended: false })); // To parse form data
// app.use(express.json()); // Parse JSON data

// const port = 3000;

// // Serve Login Page
// // app.get('/login', (req, res) => {
// //   res.render('login');
// // });

// app.post('/login', async (req, res) => {
//   console.log("Login route hit!");
//   console.log("Received login request:", req.body);

//   const { email, password } = req.body;


//   if (!email || !password) {
//       return res.status(400).json({ message: "Email and password are required" });
//   }

//   const userExists = await checkExistUser(email, password);

//   if (userExists) {
//       res.json({ message: "Login successful" })
//   } else {
//       res.status(401).json({ message: "Invalid email or password" });
//   }
// });

// // Serve Signup Page
// app.get('/signup', (req, res) => {
//   res.render('signup');
// });

// // Handle Signup Form Submission
// app.post('/signup', async (req, res) => {
//   const { firstName, lastName, email, password } = req.body;

//   try {
//     // Check if user already exists
//     const userExists = await checkUserExists(email);
//     if (userExists) {
//       return res.status(400).json({ message: 'Email already registered!' });
//     }

//     // Create a new user
//     await createUser(firstName, lastName, email, password);
//     res.status(201).json({ message: 'User registered successfully!' });

//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ message: 'Server error!' });
//   }
// });

// // 404 Page
// // app.get('*', (req, res) => {
// //   res.send('Error 404 :)');
// // });

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build'))); // Serve React build

//   // Serve the React app (index.html) for any other route
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }
// app.get('/', (req, res) => {
//   res.send('Backend is running...');
// });



// // Start Server
// app.listen(port, () => {
//   console.log('Server is running on port ' + port);
// });
const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors'); // Add CORS for frontend-backend communication
const { createUser, checkUserExists, checkExistUser } = require('./models/user'); // Import models functions
const authController = require('./controllers/authController');
const { createDoctorTable } = require('./models/doctors');
createDoctorTable(); // ✅ Will run when you start the server

//const doctorsCntroller = require('../controllers/doctorsController');

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

//app.post('/api/doctors',)

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
