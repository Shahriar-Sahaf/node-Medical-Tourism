const { Alldoctors } = require('../models/doctors')

const doctorsList = async (req,res) =>{

    try {

        const doctors = await Alldoctors();
        res.json(doctors);
        
    } catch (error) {

        console.error("Fetching Have Error ...",error);
        res.status(500).json({ error: "Internal server error" });
        
    }
}





module.exports={doctorsList};