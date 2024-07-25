alert(" hel");
const first = document.querySelectorAll("grid-container").firstChild;

first.addEventListener("onclick", function(){
    const num = prompt("enter a number between 0 and 9");
    first.textContent = num;
})

