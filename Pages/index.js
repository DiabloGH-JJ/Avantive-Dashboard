//customer data
let customers = [];

//navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', e => {
        document.querySelectorAll('.nav-link').forEach(n => n.classList.remove('active'));
        document.querySelectorAll('.dashboard-section').forEach(d => d.classList.remove('active'));
        link.classList.add('active');
        const sectionId = link.getAttribute('data-section');
        document.getElementById(sectionId).classList.add('active');
        const titles = { 
            'dashboard': 'Dashboard Overview', 
            'customers': 'Customer Management', 
            'add-retail': 'Add Retail Customer', 
            'add-wholesale': 'Add Wholesale Customer' 
        };
        document.getElementById('page-title').textContent = titles[sectionId];
        if (sectionId === 'customers') {
            loadCustomerTable();
        };
        e.preventDefault();
    });
});

// table loading
function loadCustomerTable(filteredCustomers = customers) {
  const tbody = document.getElementById('customer-table-body');
  tbody.innerHTML = '';
  
  filteredCustomers.forEach(c => {
    const row = tbody.insertRow();
    row.innerHTML = `
      <td>${c.id}</td>
      <td>${c.name}</td>
      <td><span class="customer-type-badge">${c.type}</span></td>
      <td>${c.email}<br><small>${c.phone}</small></td>
      <td>${c.lastPurchase}</td>
      <td>
        <button class="btn btn-edit" onclick="editCustomer('${c.id}')">Edit</button>
        <button class="btn btn-delete" onclick="deleteCustomer('${c.id}')">Delete</button>
      </td>
    `;
  });
}

//customer filtering(with case insensitivity)
function filterCustomers() {
    const search = document.getElementById('customer-search').value.toLowerCase();
    const type = document.getElementById('customer-filter').value.toLowerCase();
    const filtered = customers.filter(c => (c.name.toLowerCase().includes(search)
     || c.id.toLowerCase().includes(search) 
     || c.email.toLowerCase().includes(search)) && (!type || c.type.toLowerCase() === type));
    loadCustomerTable(filtered);
}
//event listeners for the searchbar and filter dropdown
document.getElementById('customer-search').addEventListener('input', filterCustomers);
document.getElementById('customer-filter').addEventListener('change', filterCustomers);

//adding a retail customer
document.getElementById('retail-form').addEventListener('submit', e => {
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
    e.preventDefault();
});

// Add wholesale
document.getElementById('wholesale-form').addEventListener('submit', e => {
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
    e.preventDefault();
});

//sign out nav button
const sidebar = document.querySelector('.sidebar .nav-menu');
const signOutItem = document.createElement('li');
signOutItem.className = 'nav-item';
signOutItem.innerHTML = '<a href="#" class="nav-link" onclick="signOut()">Sign Out</a>';
sidebar.appendChild(signOutItem);

//signing out function
function signOut() {
    if (confirm('Are you sure you want to sign out?')) {
        alert('Signed out successfully!');
        window.location.href = 'signin.html';
    }
}


//editing customers
function editCustomer(id) {
    const customer = customers.find(c => c.id === id);
    if (customer) {
        const newName = prompt('Edit Name:', customer.name);
        if (newName !== null) customer.name = newName;

        const newEmail = prompt('Edit Email:', customer.email);
        if (newEmail !== null) customer.email = newEmail;

        const newPhone = prompt('Edit Phone:', customer.phone);
        if (newPhone !== null) customer.phone = newPhone;

        const newLastPurchase = prompt('Edit Last Purchase Date:', customer.lastPurchase);
        if (newLastPurchase !== null) customer.lastPurchase = newLastPurchase;

        loadCustomerTable();
        filterCustomers();
    }
}

//deleting customers function
function deleteCustomer(id) {
    if (confirm('Are you sure you want to delete this customer?')) {
        customers = customers.filter(c => c.id !== id);
        loadCustomerTable();
        filterCustomers();
    }
}
