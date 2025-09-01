// customer data
let customers = [
    { id: 'RT001', name: 'John Kumi', type: 'retail', email: 'john.smith@email.com', phone: '(233) 0508157544', lastPurchase: '2024-12-20' },
    { id: 'WS025', name: 'AutoMax Parts Inc.', type: 'wholesale', email: 'orders@automax.com', phone: '(233) 0309876543', lastPurchase: '2024-12-18' },
    { id: 'RT089', name: 'Sarah Johnson', type: 'retail', email: 'sarah.johnson@email.com', phone: '(233) 0264567890', lastPurchase: '2024-12-19' }
];

// linking navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.dashboard-section').forEach(s => s.classList.remove('active'));
        link.classList.add('active');
        const sectionId = link.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        const titles = { 'dashboard': 'Dashboard Overview', 'customers': 'Customer Management', 'add-retail': 'Add Retail Customer', 'add-wholesale': 'Add Wholesale Customer' };
        document.getElementById('page-title').textContent = titles[sectionId];
        if (sectionId === 'customers') loadCustomerTable();
    });
});

// Loading table
function loadCustomerTable(filtered = customers) {
    const tbody = document.getElementById('customer-table-body');
    tbody.innerHTML = '';
    filtered.forEach(c => {
        tbody.insertRow().innerHTML = `<td>${c.id}</td><td>${c.name}</td><td><span class="customer-type-badge">${c.type}</span></td><td>${c.email}<br><small>${c.phone}</small></td><td>${c.lastPurchase}</td>`;
    });
}

// Filter customers
function filterCustomers() {
    const search = document.getElementById('customer-search').value.toLowerCase();
    const type = document.getElementById('customer-filter').value.toLowerCase();
    const filtered = customers.filter(c => 
        (c.name.toLowerCase().includes(search) || c.id.toLowerCase().includes(search) || c.email.toLowerCase().includes(search)) &&
        (!type || c.type === type)
    );
    loadCustomerTable(filtered);
}

document.getElementById('customer-search').addEventListener('input', filterCustomers);
document.getElementById('customer-filter').addEventListener('change', filterCustomers);

// Add retail
document.getElementById('retail-form').addEventListener('submit', e => {
    e.preventDefault();
    customers.push({
        id: document.getElementById('retail-id').value,
        name: document.getElementById('retail-name').value,
        type: 'retail',
        email: document.getElementById('retail-email').value,
        phone: document.getElementById('retail-phone').value,
        lastPurchase: document.getElementById('retail-last-purchase').value
    });
    alert('Retail customer added successfully!');
    e.target.reset();
});

// Add wholesale
document.getElementById('wholesale-form').addEventListener('submit', e => {
    e.preventDefault();
    customers.push({
        id: document.getElementById('wholesale-id').value,
        name: document.getElementById('wholesale-name').value,
        type: 'wholesale',
        email: document.getElementById('wholesale-contact-email').value,
        phone: document.getElementById('wholesale-phone').value,
        lastPurchase: document.getElementById('wholesale-last-purchase').value
    });
    alert('Wholesale customer added successfully!');
    e.target.reset();
});

// Sign out
function signOut() {
    if (confirm('Are you sure you want to sign out?')) {
        alert('Signed out successfully!');
        window.location.href = 'signin.html';
    }
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    loadCustomerTable();
    const sidebar = document.querySelector('.sidebar .nav-menu');
    const signOutItem = document.createElement('li');
    signOutItem.className = 'nav-item';
    signOutItem.innerHTML = '<a href="#" class="nav-link" onclick="signOut()">Sign Out</a>';
    sidebar.appendChild(signOutItem);
});