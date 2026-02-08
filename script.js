const searchInput=document.getElementById("search")
const container = document.getElementById("user");


async function  main() {
    const list= await displayUsers();
    console.log(list)//logs the data into console
    const Container = document.getElementById("user");

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