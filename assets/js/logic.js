import { questions } from "./questions";  //the array containing all questions and answers

var time = 60;
var startScreen = document.querySelector("#start-screen"); 
var questionsScreen = document.querySelector("questions");
var feedbackScreen = document.querySelector("feedback");
var endScreen = document.querySelector("end-screen");


function timer() {
    if (time <= 0){
        // clearInterval(timer);
        return;
    }
    time--; //subtract one second
    var timeDisplay = document.querySelector("#time");
    timeDisplay.textContent = time; // update the time with the new time
}

function displayQuestion(questions){
    
}

// when start button is clicked 
var startButton = document.querySelector("#start");
startButton.addEventListener("click", function(event){
    event.preventDefault();

    // start timer countdown from 60 seconds
    setInterval(timer, 1000);

    // change the div called "start-screen" class to "start hide"
    startScreen.setAttribute("class", "start hide");
    // change the div called "questions" class to "" so its in view
    questionsScreen.setAttribute("class", "show");
})
// start timer countdown from 60 seconds
// change the div called "start-screen" class to "start hide"
// change the div called "questions" class to "" so its in view


// iterate over the list of questions

    // update the "question-title" h2 text content to the question
    // create a button per question with the text content displayed
    // save the question index to data-index
    // and append the button to the div with id "choices"
    

    // if a user clicked on an answer
    // check the text of the answer (or maybe some data property)
    // compare that value to the correct answer

    // if (the thing the user answered is correct)
    //    display correct! in the feedback screen
    // else
    //    display incorrect in the feedback screen
    //    subtract time by 10 seconds

    //console.log(dansQuestions);

    //localStorage.setItem("testItem", "abcdefghijkl");


    // change the div called "questions" class to "hide"
    // change the div called "feedback" class to "feedback" so its in view