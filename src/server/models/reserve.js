const {Pool} = require("pg")

const pool =new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '8066',
    port: 5432,
})


const saveReservation = async () =>{
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS reservation (
            id SERIAL PRIMARY KEY,
            doctor_name VARCHAR(50) NOT NULL,
            doctor_last_name VARCHAR(50) NOT NULL,
            time VARCHAR(100) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `
    try {
        await pool.query(createTableQuery);
        console.log("✅ Users table is ready.");
    } catch (error) {
        console.error("❌ Error creating users table:", error);
    }
}

