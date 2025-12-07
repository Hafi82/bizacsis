const { Pool } = require('pg');

// Create PostgreSQL connection pool
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Initialize database schema
async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS customers (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                address TEXT NOT NULL,
                payment_status TEXT DEFAULT 'None' CHECK(payment_status IN ('None', 'Partial', 'Full')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('✓ Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
        throw error;
    }
}

// Database operations
const dbOperations = {
    // Get all customers with optional filter
    getAllCustomers: async (paymentFilter) => {
        try {
            let query = 'SELECT * FROM customers ORDER BY created_at DESC';
            let params = [];

            if (paymentFilter && paymentFilter !== 'All') {
                query = 'SELECT * FROM customers WHERE payment_status = $1 ORDER BY created_at DESC';
                params = [paymentFilter];
            }

            const result = await pool.query(query, params);
            return result.rows;
        } catch (error) {
            throw error;
        }
    },

    // Get customer by ID
    getCustomerById: async (id) => {
        try {
            const result = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
            return result.rows[0];
        } catch (error) {
            throw error;
        }
    },

    // Create new customer
    createCustomer: async (customer) => {
        try {
            const { name, address, payment_status } = customer;
            const result = await pool.query(
                'INSERT INTO customers (name, address, payment_status) VALUES ($1, $2, $3) RETURNING id',
                [name, address, payment_status || 'None']
            );
            return result.rows[0].id;
        } catch (error) {
            throw error;
        }
    },

    // Update customer
    updateCustomer: async (id, customer) => {
        try {
            const { name, address, payment_status } = customer;
            await pool.query(
                'UPDATE customers SET name = $1, address = $2, payment_status = $3 WHERE id = $4',
                [name, address, payment_status, id]
            );
        } catch (error) {
            throw error;
        }
    },

    // Delete customer
    deleteCustomer: async (id) => {
        try {
            await pool.query('DELETE FROM customers WHERE id = $1', [id]);
        } catch (error) {
            throw error;
        }
    }
};

module.exports = { dbOperations, initializeDatabase };
