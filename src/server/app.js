const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors'); 
const { createUser, checkUserExists, checkExistUser } = require('./models/user'); 
const authController = require('./controllers/authController');
const doctorsControllers = require('./controllers/doctorsControllers');
const reserveController = require('./controllers/reserveController');
const adminController = require('./controllers/adminController');
const { createDoctorTable } = require('./models/doctors');
const {Reservation} = require('./models/reserve');
const { initializeAdminTables } = require('./models/admin');

Reservation();
createDoctorTable(); 
initializeAdminTables();

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}


app.post('/api/login', authController.login);
app.post('/api/signup', authController.signup);

// Admin routes
app.post('/api/admin/login', adminController.adminLogin);
app.get('/api/admin/dashboard', adminController.getDashboardStats);
app.get('/api/admin/users', adminController.getAllUsers);
app.delete('/api/admin/users/:userId', adminController.deleteUser);
app.get('/api/admin/reservations', adminController.getAllReservations);

app.get('/api/doctors',doctorsControllers.doctorsList);

app.post('/api/reservation',reserveController.save);
app.get('/api/reservation/:userId', reserveController.getUserReservations);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
