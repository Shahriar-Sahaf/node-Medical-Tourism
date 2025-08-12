const {saveReservation} = require('../models/reserve');



const save = async(req,res)=>{
   // const{selectedPackage,treatment,first_name ,last_name, time ,specialty} = req.body;
      const {
        userId,
        user_first_name,
        user_last_name,
        user_email,
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
        //must have relation with other tables
        await saveReservation(userId, user_first_name, user_last_name, user_email, doctor_first_name, doctor_last_name, treatment, packageTier, date, time);
       // const reserveTime = await saveReservation(selectedPackage,treatment,first_name,last_name,time,specialty);
             res.status(200).json({message :'Time Reserved Successfully'});

        
    } catch (error) {

        console.error('Error:', error);
        res.status(500).json({ message: 'Server error!' });
        
    }



}
module.exports = {save}