const { Pool } = require("pg");
const bcrypt = require("bcryptjs");

// PostgreSQL Connection Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '8066',
    port: 5432,
});

// Function to add is_admin column to users table
const addAdminColumn = async () => {
    const alterTableQuery = `
        ALTER TABLE usser 
        ADD COLUMN IF NOT EXISTS is_admin BOOLEAN DEFAULT FALSE,
        ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;
    `;
    try {
        await pool.query(alterTableQuery);
        console.log("✅ Admin column added to users table.");
    } catch (error) {
        console.error("❌ Error adding admin column:", error);
    }
};

// Function to create admin_logs table
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
        console.log("✅ Admin logs table is ready.");
    } catch (error) {
        console.error("❌ Error creating admin logs table:", error);
    }
};

// Function to check if user is admin
const checkIfAdmin = async (email) => {
    const query = "SELECT id, first_name, last_name, email, is_admin FROM usser WHERE email = $1 AND is_admin = TRUE";
    const result = await pool.query(query, [email]);
    return result.rows[0] || null;
};

// Function to get all users for admin
const getAllUsers = async () => {
    const query = "SELECT id, first_name, last_name, email, created_at FROM usser WHERE is_admin = FALSE ORDER BY created_at DESC";
    const result = await pool.query(query);
    return result.rows;
};

// Function to delete user
const deleteUser = async (userId) => {
    const query = "DELETE FROM usser WHERE id = $1 AND is_admin = FALSE RETURNING *";
    const result = await pool.query(query, [userId]);
    return result.rows[0];
};

// Function to get admin dashboard stats
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

// Function to log admin actions
const logAdminAction = async (adminId, action, details, ipAddress) => {
    const query = `
        INSERT INTO admin_logs (admin_id, action, details, ip_address) 
        VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [adminId, action, JSON.stringify(details), ipAddress]);
};

// Initialize admin tables
const initializeAdminTables = async () => {
    await addAdminColumn();
    await createAdminLogsTable();
};

module.exports = {
    checkIfAdmin,
    getAllUsers,
    deleteUser,
    getDashboardStats,
    logAdminAction,
    initializeAdminTables
};
