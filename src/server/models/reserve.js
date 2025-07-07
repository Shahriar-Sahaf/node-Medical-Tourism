const {Pool} = require("pg")

const pool =new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '8066',
    port: 5432,
})


const Reservation = async () =>{
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS reservations (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            time VARCHAR(100) UNIQUE NOT NULL,
            specialty VARCHAR(100) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `
    try {
        await pool.query(createTableQuery);
        console.log("✅ Reservations table is ready.");
    } catch (error) {
        console.error("❌ Error creating Reservations table:", error);
    }
}


const saveReservation = async(first_name ,last_name, time ,specialty)=>{

try {

    await pool.query("INSERT INTO reservations (first_name ,last_name, time ,specialty) VALUES ($1, $2, $3, $4)",
        [first_name,last_name,time, specialty]
    )
    
} catch (error) {
      throw new Error(error);
    
}




}
module.exports={Reservation,saveReservation}

