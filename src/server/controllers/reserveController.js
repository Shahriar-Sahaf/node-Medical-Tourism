const {saveReservation, getReservationsWithUserInfo, getReservationsByUserId} = require('../models/reserve');

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

module.exports = {save, getAllReservations, getUserReservations}
