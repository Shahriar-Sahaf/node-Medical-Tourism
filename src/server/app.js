const express = require('express');
const path = require('path');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const authRouter = require('./routes/authRouter');
const adminRouter = require('./routes/adminRouter');
const reserveRouter = require('./routes/reserveRouter');
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


  
// Use routers
app.use('/api', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api', reserveRouter);




app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
