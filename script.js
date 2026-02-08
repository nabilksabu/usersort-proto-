// user management functions

// Assuming we have data from data.json
let users = []; // to hold user data

// Load user data from data.json
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        users = data;
        renderUsers(); // Initial render
    });

// Function to render users
function renderUsers(filteredUsers = users) {
    const userContainer = document.getElementById('userContainer');
    userContainer.innerHTML = ''; // Clear the current list
    filteredUsers.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.textContent = `Name: ${user.name}, Age: ${user.age}, Role: ${user.role}`;
        userContainer.appendChild(userDiv);
    });
}

// Debounced search function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Implement search functionality
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', debounce(function() {
    const query = this.value.toLowerCase();
    const filteredUsers = users.filter(user => user.name.toLowerCase().includes(query));
    renderUsers(filteredUsers);
}, 300));

// Filter functionality by role
const roleSelect = document.getElementById('roleSelect');
roleSelect.addEventListener('change', function() {
    const selectedRole = this.value;
    const filteredByRole = users.filter(user => user.role === selectedRole || selectedRole === '');
    renderUsers(filteredByRole);
});

// Sort functionality by age
const sortSelect = document.getElementById('sortSelect');
sortSelect.addEventListener('change', function() {
    const sortOrder = this.value;
    const sortedUsers = [...users].sort((a, b) => {
        return sortOrder === 'asc' ? a.age - b.age : b.age - a.age;
    });
    renderUsers(sortedUsers);
});

// Highlighting functionality
function highlightMatches(text, query) {
    if (!query) return text;
    const pattern = new RegExp(`(${query})`, 'gi');
    return text.replace(pattern, '<span class="highlight">$1</span>');
}

// Updated render function to include highlighting
function renderUsers(filteredUsers = users) {
    const userContainer = document.getElementById('userContainer');
    userContainer.innerHTML = ''; // Clear the current list
    filteredUsers.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `Name: ${highlightMatches(user.name, searchInput.value)}, Age: ${user.age}, Role: ${user.role}`;
        userContainer.appendChild(userDiv);
    });
}    

// Initialize the page on load
window.onload = () => {
    renderUsers();
};
