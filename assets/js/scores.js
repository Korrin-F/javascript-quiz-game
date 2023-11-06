// This page connects to the highscores.html
let orderedList = document.querySelector("#highscores");
let clear = document.querySelector("#clear");



//retrieve all the scores from local storage
let highscores =  JSON.parse(localStorage.getItem("highscores"));
// order the scores from highest to lowest
highscores.sort((a,b) => b.s - a.s );
// create a list item for each score and display it to the screen
for(var object in highscores){
    let initials = highscores[object].i;
    let score = highscores[object].s;
    let li = document.createElement("li");
    li.textContent = initials + " - " + score;
    orderedList.appendChild(li);
}
// ensure the "clear scores" button works
clear.addEventListener("click", function(){
    localStorage.removeItem("highscores");
    orderedList.innerHTML = "";
})

