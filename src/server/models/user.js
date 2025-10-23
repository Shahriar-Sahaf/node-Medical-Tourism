const pool = require('../config/database');
const bcrypt = require("bcryptjs");


const createUsersTable = async () => {
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS usser (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(50) NOT NULL,
            last_name VARCHAR(50) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;
    try {
        await pool.query(createTableQuery);
        console.log(" Users table is ready.");
    } catch (error) {
        console.error(" Error creating users table:", error);
    }
};


const checkUserExists = async (email) => {
    const result = await pool.query("SELECT * FROM usser WHERE email = $1", [email]);
    return result.rows.length > 0;
};


const createUser = async (firstName, lastName, email, password , passport) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO usser (first_name, last_name, email, password, passport) VALUES ($1, $2, $3, $4, $5) RETURNING id",
            [firstName, lastName, email, hashedPassword, passport]
        );
        return result.rows[0].id;
    } catch (error) {
        throw new Error(error);
    }
};


async function checkExistUser(email, password) {
  try {
    const query = "SELECT * FROM usser WHERE email = $1";
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0) return null;

    const user = result.rows[0];
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (isPasswordMatch) {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Database error:", error);
    return null;
  }
}


createUsersTable();

module.exports = { checkUserExists, createUser, checkExistUser  };
