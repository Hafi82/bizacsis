// ============================================
// CONFIGURATION - Change these settings
// ============================================
const USE_BACKEND = false; // Set to true to use backend API, false for localStorage
const API_URL = 'https://your-service-name.onrender.com/api/customers'; // Replace with your Render URL

// ============================================
// Hybrid Storage System
// ============================================
const STORAGE_KEY = 'excellence_graphics_customers';

// State
let currentFilter = 'All';
let currentCustomerId = null;

// DOM Elements
const customersGrid = document.getElementById('customersGrid');
const customersContainer = document.getElementById('customersContainer');
const customerModal = document.getElementById('customerModal');
const viewModal = document.getElementById('viewModal');
const customerForm = document.getElementById('customerForm');
const addCustomerBtn = document.getElementById('addCustomerBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const closeViewModalBtn = document.getElementById('closeViewModalBtn');
const cancelBtn = document.getElementById('cancelBtn');
const modalTitle = document.getElementById('modalTitle');
const filterButtons = document.querySelectorAll('.btn-filter');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCustomers();
    setupEventListeners();
    displayMode();
});

// Display current mode
function displayMode() {
    const mode = USE_BACKEND ? '🌐 Online Mode (Backend API)' : '💾 Offline Mode (LocalStorage)';
    console.log(`%c${mode}`, 'background: #667eea; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
}

// Event Listeners
function setupEventListeners() {
    addCustomerBtn.addEventListener('click', () => openModal());
    closeModalBtn.addEventListener('click', closeModal);
    closeViewModalBtn.addEventListener('click', closeViewModal);
    cancelBtn.addEventListener('click', closeModal);

    customerModal.addEventListener('click', (e) => {
        if (e.target === customerModal) closeModal();
    });
    viewModal.addEventListener('click', (e) => {
        if (e.target === viewModal) closeViewModal();
    });

    customerForm.addEventListener('submit', handleFormSubmit);

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            loadCustomers();
        });
    });
}

// ============================================
// BACKEND API Functions
// ============================================
async function loadCustomersFromAPI() {
    let url = API_URL;
    if (currentFilter !== 'All') {
        url += `?payment_status=${currentFilter}`;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
}

async function getCustomerFromAPI(id) {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
}

async function createCustomerInAPI(customerData) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    });
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
}

async function updateCustomerInAPI(id, customerData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData)
    });
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
}

async function deleteCustomerFromAPI(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('API request failed');
    return await response.json();
}

// ============================================
// LOCALSTORAGE Functions
// ============================================
function getAllCustomersFromStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveCustomersToStorage(customers) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
}

function getNextId() {
    const customers = getAllCustomersFromStorage();
    if (customers.length === 0) return 1;
    return Math.max(...customers.map(c => c.id)) + 1;
}

function loadCustomersFromStorage() {
    let customers = getAllCustomersFromStorage();
    if (currentFilter !== 'All') {
        customers = customers.filter(c => c.payment_status === currentFilter);
    }
    customers.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    return customers;
}

function getCustomerFromStorage(id) {
    const customers = getAllCustomersFromStorage();
    return customers.find(c => c.id === id);
}

function createCustomerInStorage(customerData) {
    const customers = getAllCustomersFromStorage();
    const newCustomer = {
        id: getNextId(),
        ...customerData,
        created_at: new Date().toISOString()
    };
    customers.push(newCustomer);
    saveCustomersToStorage(customers);
    return newCustomer;
}

function updateCustomerInStorage(id, customerData) {
    const customers = getAllCustomersFromStorage();
    const index = customers.findIndex(c => c.id === parseInt(id));
    if (index !== -1) {
        customers[index] = {
            ...customers[index],
            ...customerData
        };
        saveCustomersToStorage(customers);
    }
}

function deleteCustomerFromStorage(id) {
    let customers = getAllCustomersFromStorage();
    customers = customers.filter(c => c.id !== id);
    saveCustomersToStorage(customers);
}

// ============================================
// UNIFIED Functions (Auto-switch based on config)
// ============================================
async function loadCustomers() {
    try {
        let customers;
        if (USE_BACKEND) {
            customers = await loadCustomersFromAPI();
        } else {
            customers = loadCustomersFromStorage();
        }
        displayCustomers(customers);
    } catch (error) {
        console.error('Error loading customers:', error);
        showError('Failed to load customers. ' + (USE_BACKEND ? 'Check if backend is running.' : ''));
    }
}

async function viewCustomer(id) {
    try {
        let customer;
        if (USE_BACKEND) {
            customer = await getCustomerFromAPI(id);
        } else {
            customer = getCustomerFromStorage(id);
        }

        if (!customer) {
            showError('Customer not found');
            return;
        }

        const detailsContainer = document.getElementById('customerDetails');
        detailsContainer.innerHTML = `
            <div class="detail-section">
                <div class="detail-label">Customer Name</div>
                <div class="detail-value">${escapeHtml(customer.name)}</div>
            </div>
            <div class="detail-section">
                <div class="detail-label">Address</div>
                <div class="detail-value">${escapeHtml(customer.address)}</div>
            </div>
            <div class="detail-section">
                <div class="detail-label">Payment Status</div>
                <div class="detail-value">
                    <span class="payment-badge payment-${customer.payment_status.toLowerCase()}">
                        ${customer.payment_status}
                    </span>
                </div>
            </div>
            <div class="detail-section">
                <div class="detail-label">Customer ID</div>
                <div class="detail-value">${customer.id}</div>
            </div>
            <div class="detail-section">
                <div class="detail-label">Created Date</div>
                <div class="detail-value">${formatDate(customer.created_at)}</div>
            </div>
        `;

        currentCustomerId = id;
        viewModal.classList.add('active');

        document.getElementById('editFromViewBtn').onclick = () => {
            closeViewModal();
            editCustomer(id);
        };
        document.getElementById('deleteFromViewBtn').onclick = () => {
            closeViewModal();
            deleteCustomer(id);
        };
    } catch (error) {
        console.error('Error viewing customer:', error);
        showError('Failed to load customer details');
    }
}

async function editCustomer(id) {
    try {
        let customer;
        if (USE_BACKEND) {
            customer = await getCustomerFromAPI(id);
        } else {
            customer = getCustomerFromStorage(id);
        }

        if (!customer) {
            showError('Customer not found');
            return;
        }

        openModal(customer);
    } catch (error) {
        console.error('Error loading customer for edit:', error);
        showError('Failed to load customer');
    }
}

async function handleFormSubmit(e) {
    e.preventDefault();

    const customerId = document.getElementById('customerId').value;
    const customerData = {
        name: document.getElementById('customerName').value.trim(),
        address: document.getElementById('customerAddress').value.trim(),
        payment_status: document.getElementById('paymentStatus').value
    };

    if (!customerData.name || !customerData.address) {
        showError('Please fill in all required fields');
        return;
    }

    try {
        if (customerId) {
            // Update
            if (USE_BACKEND) {
                await updateCustomerInAPI(customerId, customerData);
            } else {
                updateCustomerInStorage(customerId, customerData);
            }
            showSuccess('Customer updated successfully!');
        } else {
            // Create
            if (USE_BACKEND) {
                await createCustomerInAPI(customerData);
            } else {
                createCustomerInStorage(customerData);
            }
            showSuccess('Customer created successfully!');
        }

        closeModal();
        loadCustomers();
    } catch (error) {
        console.error('Error saving customer:', error);
        showError('Failed to save customer');
    }
}

async function deleteCustomer(id) {
    if (!confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
        return;
    }

    try {
        if (USE_BACKEND) {
            await deleteCustomerFromAPI(id);
        } else {
            deleteCustomerFromStorage(id);
        }
        loadCustomers();
        showSuccess('Customer deleted successfully!');
    } catch (error) {
        console.error('Error deleting customer:', error);
        showError('Failed to delete customer');
    }
}

// ============================================
// UI Functions
// ============================================
function displayCustomers(customers) {
    if (customers.length === 0) {
        customersContainer.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <h3>No Customers Found</h3>
                <p>Start by adding your first customer</p>
                <button class="btn btn-primary" onclick="openModal()">➕ Add Customer</button>
            </div>
        `;
        return;
    }

    customersGrid.innerHTML = customers.map(customer => `
        <div class="customer-card" onclick="viewCustomer(${customer.id})">
            <div class="customer-header">
                <div>
                    <div class="customer-name">${escapeHtml(customer.name)}</div>
                    <div class="customer-id">ID: ${customer.id}</div>
                </div>
                <span class="payment-badge payment-${customer.payment_status.toLowerCase()}">
                    ${customer.payment_status}
                </span>
            </div>
            <div class="customer-address">${escapeHtml(customer.address)}</div>
            <div class="customer-actions" onclick="event.stopPropagation()">
                <button class="btn btn-primary btn-icon" onclick="editCustomer(${customer.id})">
                    ✏️ Edit
                </button>
                <button class="btn btn-danger btn-icon" onclick="deleteCustomer(${customer.id})">
                    🗑️ Delete
                </button>
            </div>
        </div>
    `).join('');
}

function openModal(customer = null) {
    if (customer) {
        modalTitle.textContent = 'Edit Customer';
        document.getElementById('customerId').value = customer.id;
        document.getElementById('customerName').value = customer.name;
        document.getElementById('customerAddress').value = customer.address;
        document.getElementById('paymentStatus').value = customer.payment_status;
    } else {
        modalTitle.textContent = 'Add Customer';
        customerForm.reset();
        document.getElementById('customerId').value = '';
    }
    customerModal.classList.add('active');
}

function closeModal() {
    customerModal.classList.remove('active');
    customerForm.reset();
}

function closeViewModal() {
    viewModal.classList.remove('active');
    currentCustomerId = null;
}

// ============================================
// Utility Functions
// ============================================
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showSuccess(message) {
    alert('✓ ' + message);
}

function showError(message) {
    alert('✗ ' + message);
}
