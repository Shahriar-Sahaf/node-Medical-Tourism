const {saveReservation} = require('../models/reserve');



const save = async(req,res)=>{
    const{first_name ,last_name, time ,specialty} = req.body;


    try {

        const reserveTime = await saveReservation(first_name ,last_name, time ,specialty);
        if (reserveTime) {
            
            return res.status(200).json({masssage :'Time Reserved Successfuly !!!'});
        }

        
    } catch (error) {

        console.error('Error:', error);
        res.status(500).json({ message: 'Server error!' });
        
    }



}
module.exports = {save}