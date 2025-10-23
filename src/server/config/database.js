const { Pool } = require("pg");

// PostgreSQL Connection Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydb',
    password: '8066',
    port: 5432,
});

module.exports = pool;
