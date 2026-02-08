// debounce function
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

// search function
function searchItems(items, query) {
    return items.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase())
    );
}

// sort function
function sortByAge(items) {
    return items.sort((a, b) => a.age - b.age);
}

// filter function
function filterByRole(items, role) {
    return items.filter(item => item.role === role);
}

// highlight function
function highlightText(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<span class="highlight">$1</span>');
}

// Example usage
const items = [...]; // Your items array
const searchInput = document.getElementById("search");

searchInput.addEventListener("input", debounce(function() {
    const query = searchInput.value;
    let results = searchItems(items, query);
    results = sortByAge(results);
    const roleFilter = document.querySelector("select#role-filter").value;
    results = filterByRole(results, roleFilter);

    // Update UI with highlighted text
    // Assuming displayResults is a function that displays results in the UI
    displayResults(results.map(item => ({ ...item, name: highlightText(item.name, query) })));
}, 300));
