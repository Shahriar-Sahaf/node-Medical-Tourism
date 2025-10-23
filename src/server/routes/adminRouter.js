const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.post('/login', adminController.adminLogin);
router.get('/dashboard', adminController.verifyAdmin, adminController.getDashboardStats);
router.get('/users', adminController.verifyAdmin, adminController.getAllUsers);
router.post('/users', adminController.verifyAdmin, adminController.addUser);
router.delete('/users/:userId', adminController.verifyAdmin, adminController.deleteUser);
router.get('/reservations', adminController.verifyAdmin, adminController.getAllReservations);
router.delete('/reservations/:reservationId', adminController.verifyAdmin, adminController.deleteReservation);
router.get('/doctors', adminController.verifyAdmin, adminController.getAllDoctors);
router.post('/doctors', adminController.verifyAdmin, adminController.addDoctor);
router.delete('/doctors/:doctorId', adminController.verifyAdmin, adminController.deleteDoctor);
router.post('/admins', adminController.verifyAdmin, adminController.addAdmin);

module.exports = router;
