const searchInput=document.getElementById("search")
const container = document.getElementById("user");
const input=document.querySelector("#search");

async function  main() {
    const list= await displayUsers();
    console.log(list)//logs the data into console
    const Container = document.getElementById("user");
    let query=input.value

    //tests in console to check data
    list.forEach(element => {
        console.log('Name',element.Name);
        console.log('Age',element.Age)
        console.log('Role',element.Role)
    });

    //to list out users
    list.forEach(user => {
        Container.innerHTML+=`
        <p>
        <span><strong>Name:</strong> ${user.Name}</span>
        <span><strong>Age:</strong> ${user.Age}</span>
        <span><strong>Role:</strong> ${user.Role}</span>
        </p>
        `;
    });
}

//fetches data.json
async function displayUsers(){
    const user=await fetch('data.json');
    const userData=await user.json();
    return userData;
}
main();





let users = [];
let debounceTimer;

// Fetch data
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        users = data;
        populateRoleFilter(users);
        displayUsers(users);
    });


// Display Users
function displayUsers(list) {
    const userDiv = document.getElementById("user");
    userDiv.innerHTML = "";

    list.forEach(user => {
        const p = document.createElement("p");

        p.innerHTML = `
            <span>${highlightText(user.Name)}</span>
            <span>${user.Age}</span>
            <span>${user.Role}</span>
        `;

        userDiv.appendChild(p);
    });
}


// Highlight search text (Bonus)
function highlightText(name){
    const search = document.getElementById("search").value.toLowerCase();
    if(!search) return name;

    const regex = new RegExp(`(${search})`, "gi");
    return name.replace(regex, `<strong>$1</strong>`);
}


// Populate Role Dropdown
function populateRoleFilter(data){
    const roleFilter = document.getElementById("roleFilter");

    const roles = [...new Set(data.map(user => user.Role))];

    roles.forEach(role=>{
        const option = document.createElement("option");
        option.value = role;
        option.textContent = role;
        roleFilter.appendChild(option);
    });
}


// Main Filter + Sort Logic
function applyFilters(){

    let filtered = [...users];

    // SEARCH
    const searchText = document.getElementById("search").value.toLowerCase();
    if(searchText){
        filtered = filtered.filter(user =>
            user.Name.toLowerCase().includes(searchText)
        );
    }

    // ROLE FILTER
    const roleValue = document.getElementById("roleFilter").value;
    if(roleValue !== "all"){
        filtered = filtered.filter(user =>
            user.Role === roleValue
        );
    }

    // SORT
    const sortValue = document.getElementById("ageSort").value;
    if(sortValue === "asc"){
        filtered.sort((a,b)=> a.Age - b.Age);
    }
    else if(sortValue === "desc"){
        filtered.sort((a,b)=> b.Age - a.Age);
    }

    displayUsers(filtered);
}


// Debounced Search (Bonus)
document.getElementById("search").addEventListener("input", () => {

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(()=>{
        applyFilters();
    }, 300);

});


// Role Filter Event
document.getElementById("roleFilter").addEventListener("change", applyFilters);

// Sort Event
document.getElementById("ageSort").addEventListener("change", applyFilters);
