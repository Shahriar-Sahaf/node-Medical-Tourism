const { Pool } = require("pg");
const bcrypt = require("bcryptjs");
const bcryptt = require("bcrypt");

// PostgreSQL Connection Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '8066',
    port: 5432,
});

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
        console.log("✅ Doctors table is ready.");
        
    } catch (error) {
        console.error("❌ Error creating Doctors table:", error);
        
    }

};
module.exports = { createDoctorTable }

