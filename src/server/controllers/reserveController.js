const {saveReservation, getReservationsWithUserInfo, getReservationsByUserId, deleteReservation ,getReservationsByDoctorDateTime} = require('../models/reserve');

const save = async(req,res)=>{
    const {
        userId,
        treatment,
        packageTier,
        doctor_first_name,
        doctor_last_name,
        date,
        time
    } = req.body;

    try {
        if (!userId || !treatment || !packageTier || !doctor_first_name || !date || !time) {
            return res.status(400).json({ message: "Missing required reservation fields." });
        }

       
        const existingReservations = await getReservationsByDoctorDateTime(doctor_first_name, doctor_last_name, date, time);
        if (existingReservations.length > 0) {
            return res.status(409).json({ message: "This doctor already has a reservation at the selected date and time." });
        }
        
        await saveReservation(userId, treatment, packageTier, doctor_first_name, doctor_last_name, date, time);
        res.status(200).json({message :'Time Reserved Successfully'});
        
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error!' });
    }
}


const getAllReservations = async(req,res)=>{
    try {
        const reservations = await getReservationsWithUserInfo();
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error!' });
    }
}


const getUserReservations = async(req,res)=>{
    const { userId } = req.params;

    try {
        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const reservations = await getReservationsByUserId(userId);
        res.status(200).json(reservations);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error!' });
    }
}

const cancel = async(req,res)=>{
    const { reservationId } = req.params;
    const { userId } = req.body; 

    try {
        if (!reservationId || !userId) {
            return res.status(400).json({ message: "Reservation ID and User ID are required." });
        }

        
        const reservations = await getReservationsByUserId(userId);
        const reservation = reservations.find(r => r.id == reservationId);

        if (!reservation) {
            return res.status(404).json({ message: "Reservation not found or does not belong to this user." });
        }

        
        const deleted = await deleteReservation(reservationId);
        if (deleted) {
            res.status(200).json({ message: "Reservation cancelled successfully." });
        } else {
            res.status(500).json({ message: "Failed to cancel reservation." });
        }

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server error!' });
    }
}

module.exports = {save, getAllReservations, getUserReservations, cancel}
