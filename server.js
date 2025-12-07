require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbOperations, initializeDatabase } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));
app.use(express.json());

// Health check endpoint (for Render)
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Excellence Graphics API is running' });
});

// API Routes

// Get all customers (with optional payment status filter)
app.get('/api/customers', async (req, res) => {
    try {
        const { payment_status } = req.query;
        const customers = await dbOperations.getAllCustomers(payment_status);
        res.json(customers);
    } catch (error) {
        console.error('Error fetching customers:', error);
        res.status(500).json({ error: 'Failed to fetch customers' });
    }
});

// Get single customer by ID
app.get('/api/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const customer = await dbOperations.getCustomerById(id);

        if (!customer) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        res.json(customer);
    } catch (error) {
        console.error('Error fetching customer:', error);
        res.status(500).json({ error: 'Failed to fetch customer' });
    }
});

// Create new customer
app.post('/api/customers', async (req, res) => {
    try {
        const { name, address, payment_status } = req.body;

        // Validation
        if (!name || !address) {
            return res.status(400).json({ error: 'Name and address are required' });
        }

        const customer = { name, address, payment_status: payment_status || 'None' };
        const customerId = await dbOperations.createCustomer(customer);

        res.status(201).json({
            message: 'Customer created successfully',
            customerId
        });
    } catch (error) {
        console.error('Error creating customer:', error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
});

// Update customer
app.put('/api/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, payment_status } = req.body;

        // Validation
        if (!name || !address) {
            return res.status(400).json({ error: 'Name and address are required' });
        }

        const customer = { name, address, payment_status };
        await dbOperations.updateCustomer(id, customer);

        res.json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error('Error updating customer:', error);
        res.status(500).json({ error: 'Failed to update customer' });
    }
});

// Delete customer
app.delete('/api/customers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await dbOperations.deleteCustomer(id);
        res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error('Error deleting customer:', error);
        res.status(500).json({ error: 'Failed to delete customer' });
    }
});

// Initialize database and start server
async function startServer() {
    try {
        await initializeDatabase();
        app.listen(PORT, () => {
            console.log(`✓ Excellence Graphics API running on port ${PORT}`);
            console.log(`✓ Health check: http://localhost:${PORT}/health`);
            console.log(`✓ API endpoint: http://localhost:${PORT}/api/customers`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

startServer();
