const { 
    checkIfAdmin, 
    getAllUsers, 
    deleteUser, 
    getDashboardStats, 
    logAdminAction 
} = require('../models/admin');
const { checkExistUser } = require('../models/user');

// Admin login
exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        // Check if user exists and is admin
        const admin = await checkIfAdmin(email);
        if (!admin) {
            return res.status(401).json({ message: "Invalid admin credentials" });
        }

        // Verify password
        const dbUser = await checkExistUser(email, password);
        if (!dbUser) {
            return res.status(401).json({ message: "Invalid admin credentials" });
        }

        // Log admin login
        await logAdminAction(admin.id, 'ADMIN_LOGIN', { email }, req.ip);

        // Return admin data (without password)
        const adminData = {
            id: admin.id,
            firstName: admin.first_name,
            lastName: admin.last_name,
            email: admin.email,
            isAdmin: admin.is_admin
        };

        res.json({ message: "Admin login successful", admin: adminData });
    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ message: "Server error during admin login" });
    }
};

// Get dashboard statistics
exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await getDashboardStats();
        res.json(stats);
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(500).json({ message: "Error fetching dashboard statistics" });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: "Error fetching users" });
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const { userId } = req.params;

    try {
        const deletedUser = await deleteUser(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found or cannot be deleted" });
        }

        // Log admin action
        await logAdminAction(req.adminId, 'DELETE_USER', { userId, email: deletedUser.email }, req.ip);

        res.json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({ message: "Error deleting user" });
    }
};

// Get all reservations (admin view)
exports.getAllReservations = async (req, res) => {
    try {
        // This would need to be implemented based on your reservation model
        const query = `
            SELECT r.*, u.first_name, u.last_name, u.email 
            FROM reservation r 
            JOIN usser u ON r.user_id = u.id 
            ORDER BY r.created_at DESC
        `;
        const { Pool } = require("pg");
        const pool = new Pool({
            user: 'postgres',
            host: 'localhost',
            database: 'mydb',
            password: '8066',
            port: 5432,
        });
        
        const result = await pool.query(query);
        res.json(result.rows);
    } catch (error) {
        console.error('Get reservations error:', error);
        res.status(500).json({ message: "Error fetching reservations" });
    }
};

// Middleware to verify admin
exports.verifyAdmin = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // In a real app, you'd verify JWT token here
        // For now, we'll check if email is provided and is admin
        const { email } = req.body;
        const admin = await checkIfAdmin(email);
        
        if (!admin) {
            return res.status(403).json({ message: "Admin access required" });
        }

        req.adminId = admin.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
