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
        CREATE TABLE IF NOT EXISTS reservation (
                id SERIAL PRIMARY KEY,

            user_id INTEGER NOT NULL,
            user_first_name VARCHAR(50),
            user_last_name VARCHAR(50),
            user_email VARCHAR(255),

           
            doctor_first_name VARCHAR(50),
            doctor_last_name VARCHAR(50),

            treatment VARCHAR(255),
            package_tier VARCHAR(50),

           
            "date" DATE NOT NULL,
            "time" VARCHAR(5) NOT NULL,

          
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `
    try {
        await pool.query(createTableQuery);
        console.log("✅ Reservations table is ready.");
    } catch (error) {
        console.error("❌ Error creating Reservations table:", error);
    }
}


const saveReservation = async(userId, user_first_name, user_last_name, user_email,treatment,
     packageTier,doctor_first_name, doctor_last_name, date, time)=>{

try {

    const query = `
            INSERT INTO reservation (
                user_id, user_first_name, user_last_name, user_email,
                doctor_first_name, doctor_last_name,
                treatment, package_tier,
                "date", "time"
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        `;
        
        const values = [
            userId, user_first_name, user_last_name, user_email,
            treatment, packageTier,
            doctor_first_name, doctor_last_name,
            date, time
        ];

        await pool.query(query, values);

    console.log("✅ Reservation saved successfully.");

} catch (error) {
    
      throw new Error(error);
    
}


}
module.exports={Reservation,saveReservation}

