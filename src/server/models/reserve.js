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
            user_id INTEGER NOT NULL REFERENCES usser(id) ON DELETE CASCADE,
            doctor_first_name VARCHAR(50),
            doctor_last_name VARCHAR(50),
            treatment VARCHAR(255),
            package_tier VARCHAR(50),
            "date" DATE NOT NULL,
            "time" VARCHAR(5) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
    `
    
    // Migration query to update existing table structure
    const migrationQueries = [
        // Add foreign key constraint if table exists
        `ALTER TABLE reservation 
         ADD CONSTRAINT fk_user 
         FOREIGN KEY (user_id) REFERENCES usser(id) ON DELETE CASCADE`,
        
        // Drop user info columns if they exist
        `ALTER TABLE reservation 
         DROP COLUMN IF EXISTS user_first_name`,
        
        `ALTER TABLE reservation 
         DROP COLUMN IF EXISTS user_last_name`,
        
        `ALTER TABLE reservation 
         DROP COLUMN IF EXISTS user_email`
    ];
    
    try {
        await pool.query(createTableQuery);
        
        // Run migration queries
        for (const query of migrationQueries) {
            try {
                await pool.query(query);
            } catch (migrationError) {
               
                console.log("Migration note:", migrationError.message);
            }
        }
        
        console.log("✅ Reservations table is ready with proper foreign key.");
    } catch (error) {
        console.error("❌ Error creating Reservations table:", error);
    }
}


const saveReservation = async(userId, treatment, packageTier, doctor_first_name, doctor_last_name, date, time) => {
    try {
        const query = `
            INSERT INTO reservation (
                user_id, doctor_first_name, doctor_last_name,
                treatment, package_tier,
                "date", "time"
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;
        
        const values = [
            userId, doctor_first_name, doctor_last_name,
            treatment, packageTier,
            date, time
        ];

        await pool.query(query, values);
        console.log("✅ Reservation saved successfully.");
    } catch (error) {
        throw new Error(error);
    }
}


const getReservationsWithUserInfo = async () => {
    try {
        const query = `
            SELECT 
                r.id,
                r.doctor_first_name,
                r.doctor_last_name,
                r.treatment,
                r.package_tier,
                r.date,
                r.time,
                r.created_at,
                u.first_name as user_first_name,
                u.last_name as user_last_name,
                u.email as user_email
            FROM reservation r
            JOIN usser u ON r.user_id = u.id
            ORDER BY r.created_at DESC
        `;
        
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        throw new Error(error);
    }
}


const getReservationByIdWithUserInfo = async (reservationId) => {
    try {
        const query = `
            SELECT 
                r.*,
                u.first_name as user_first_name,
                u.last_name as user_last_name,
                u.email as user_email
            FROM reservation r
            JOIN usser u ON r.user_id = u.id
            WHERE r.id = $1
        `;
        
        const result = await pool.query(query, [reservationId]);
        return result.rows[0];
    } catch (error) {
        throw new Error(error);
    }
}


const getReservationsByUserId = async (userId) => {
    try {
        const query = `
            SELECT * FROM reservation 
            WHERE user_id = $1 
            ORDER BY created_at DESC
        `;
        
        const result = await pool.query(query, [userId]);
        return result.rows;
    } catch (error) {
        throw new Error(error);
    }
}

module.exports = {
    Reservation,
    saveReservation,
    getReservationsWithUserInfo,
    getReservationByIdWithUserInfo,
    getReservationsByUserId
}

