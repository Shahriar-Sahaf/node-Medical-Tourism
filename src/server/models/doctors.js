const pool = require('../config/database');
const bcrypt = require("bcryptjs");
const bcryptt = require("bcrypt");

const createDoctorTable = async() =>{
    const createTable= `
    CREATE TABLE IF NOT EXISTS doctors (
        id SERIAL PRIMARY KEY,
        first_name VARCHAR(50) NOT NULL,
        last_name VARCHAR(50) NOT NULL,
        specialty VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;
    try {
        await pool.query(createTable);
        console.log(" Doctors table is ready.");
        
    } catch (error) {
        console.error(" Error creating Doctors table:", error);
        
    }

};


const Alldoctors = async()=>{

    const list = await pool.query("SELECT id, first_name,last_name ,specialty FROM doctors");

    return list.rows;
}


const addDoctor = async (firstName, lastName, specialty) => {
    try {
        const query = `
            INSERT INTO doctors (first_name, last_name, specialty)
            VALUES ($1, $2, $3)
            RETURNING id, first_name, last_name, specialty, created_at
        `;
        const result = await pool.query(query, [firstName, lastName, specialty]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating doctor: ' + error.message);
    }
};


const deleteDoctor = async (doctorId) => {
    const query = "DELETE FROM doctors WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [doctorId]);
    return result.rows[0];
};

module.exports = { createDoctorTable , Alldoctors, addDoctor, deleteDoctor}

