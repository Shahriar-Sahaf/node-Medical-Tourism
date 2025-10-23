const express = require('express');
const router = express.Router();
const doctorsControllers = require('../controllers/doctorsControllers');
const reserveController = require('../controllers/reserveController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/doctors', doctorsControllers.doctorsList);
router.post('/reservation', authenticateToken, reserveController.save);
router.get('/reservation/:userId', authenticateToken, reserveController.getUserReservations);
router.delete('/reservation/:reservationId', authenticateToken, reserveController.cancel);

module.exports = router;
