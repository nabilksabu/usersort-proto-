// JavaScript code for search, sort, filter, and highlight features

// Function to search through an array
function search(array, query) {
    return array.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

// Function to sort an array
function sort(array) {
    return array.sort(); // Default sort (alphabetical)
}

// Function to filter items based on a condition
function filter(array, condition) {
    return array.filter(item => condition(item));
}

// Function to highlight matches in search results
function highlightMatches(array, query) {
    const regex = new RegExp(query, 'gi');
    return array.map(item => item.replace(regex, match => `<span class='highlight'>${match}</span>`));
}

// Usage Example:
const items = ['apple', 'banana', 'blueberry', 'cherry', 'date'];

const searchResults = search(items, 'b'); // Search for items containing 'b'
const sortedItems = sort(items); // Sort items alphabetically
const filteredItems = filter(items, item => item.startsWith('b')); // Filter items that start with 'b'
const highlightedItems = highlightMatches(items, 'a'); // Highlight matches for 'a'