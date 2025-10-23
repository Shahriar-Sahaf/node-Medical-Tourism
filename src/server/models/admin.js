const pool = require('../config/database');
const bcrypt = require("bcryptjs");

const addAdminColumn = async () => {
    const alterTableQuery = `
        ALTER TABLE usser 
        ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `;
    try {
        await pool.query(alterTableQuery);
        console.log("Admin column added to users table.");
    } catch (error) {
        console.error(" Error adding admin column:", error);
    }
};

const createAdminLogsTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS admin_logs (
            id SERIAL PRIMARY KEY,
            admin_id INTEGER REFERENCES usser(id),
            action VARCHAR(100) NOT NULL,
            details JSONB,
            ip_address VARCHAR(45),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log("Admin logs table is ready.");
    } catch (error) {
        console.error(" Error creating admin logs table:", error);
    }
};


const checkIfAdmin = async (email) => {
    const query = "SELECT id, first_name, last_name, email, is_admin FROM usser WHERE email = $1 AND is_admin = TRUE";
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
};


const getAllUsers = async () => {
    const query = "SELECT id, first_name, last_name, email, created_at FROM usser WHERE is_admin = FALSE ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
};


const addUser = async (firstName, lastName, email, password, isAdmin = false) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = `
            INSERT INTO usser (first_name, last_name, email, password, is_admin)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id, first_name, last_name, email, is_admin, created_at
        `;
        const result = await pool.query(query, [firstName, lastName, email, hashedPassword, isAdmin]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Error creating user: ' + error.message);
    }
};


const deleteUser = async (userId) => {
    const query = "DELETE FROM usser WHERE id = $1 AND is_admin = FALSE RETURNING *";
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};


const getDashboardStats = async () => {
    const queries = [
        "SELECT COUNT(*) as total_users FROM usser WHERE is_admin = FALSE",
        "SELECT COUNT(*) as total_reservations FROM reservation",
        "SELECT COUNT(*) as today_reservations FROM reservation WHERE DATE(created_at) = CURRENT_DATE",
        "SELECT COUNT(*) as total_doctors FROM doctors"
    ];
    
    const results = await Promise.all(queries.map(q => pool.query(q)));
    return {
        totalUsers: parseInt(results[0].rows[0].total_users),
        totalReservations: parseInt(results[1].rows[0].total_reservations),
        todayReservations: parseInt(results[2].rows[0].today_reservations),
        totalDoctors: parseInt(results[3].rows[0].total_doctors)
    };
};


const logAdminAction = async (adminId, action, details, ipAddress) => {
    const query = `
        INSERT INTO admin_logs (admin_id, action, details, ip_address) 
        VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [adminId, action, JSON.stringify(details), ipAddress]);
};


const getAllReservations = async()=>{
 const query = `SELECT r.*, u.first_name, u.last_name, u.email 
            FROM reservation r 
            JOIN usser u ON r.user_id = u.id 
            ORDER BY r.created_at DESC`;


    const result = await pool.query(query);
    return result;

}


const initializeAdminTables = async () => {
    await addAdminColumn();
    await createAdminLogsTable();
};

module.exports = {
    checkIfAdmin,
    getAllUsers,
    addUser,
    deleteUser,
    getDashboardStats,
    logAdminAction,
    initializeAdminTables,
    getAllReservations
};
