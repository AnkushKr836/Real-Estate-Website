let username = localStorage.getItem("username");
let visitCount = localStorage.getItem("visitCount");

if (!username) {
    username = prompt("Welcome! Please enter your name:");
    localStorage.setItem("username", username);
    visitCount = 1;
} else {
    visitCount = parseInt(visitCount) + 1;
}

localStorage.setItem("visitCount", visitCount);

alert(`Hello ${username}! You have visited this website ${visitCount} times.`);
