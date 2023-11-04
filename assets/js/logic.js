import { questions } from "./questions.js";  //the array containing all questions and answers

var time = 60;
var questionIndex = 0;

var startScreen = document.querySelector("#start-screen"); 
var questionsScreen = document.querySelector("#questions");
var feedbackScreen = document.querySelector("#feedback");
var endScreen = document.querySelector("#end-screen");

var startButton = document.querySelector("#start");
var questionTitle = document.querySelector("#question-title");
var choicesColumn = document.querySelector("#choices");

function timer() {
    if (time <= 0){
        // clearInterval(timer);
        return;
    }
    time--; //subtract one second
    var timeDisplay = document.querySelector("#time");
    timeDisplay.textContent = time; // update the time with the new time
}
// q: question
// a: array of 4 answers
// aIndex: the index of the correct answer

function displayQuestion(questions){
    //update #question-title with the question
    console.log("Result at index: " + questionIndex + "is: " + questions[questionIndex]);
    questionTitle.textContent = questions[questionIndex].q
    // create an ordered list element
    let ol = document.createElement("ol");
    choicesColumn.appendChild(ol);
    let answerIndex = 0;

    for(var answer of questions[questionIndex].a){
        let li = document.createElement("li");
        ol.appendChild(li);
        //create a button
        let button = document.createElement("button");
        //update the text to an answer option
        button.textContent = answer;
        //update the data-index attribute to the current index of the answer
        button.setAttribute("data-index", answerIndex);
        //append to child of #choices
        li.appendChild(button);
        //increase the answer index by 1
        answerIndex++;
    }
    
}

// when start button is clicked 

startButton.addEventListener("click", function(event){
    event.preventDefault();

    // start timer countdown from 60 seconds
    setInterval(timer, 1000);

    // change the div called "start-screen" class to "start hide"
    startScreen.setAttribute("class", "start hide");
    // change the div called "questions" class to "" so its in view
    questionsScreen.setAttribute("class", "show");
    // load the first question
    displayQuestion(questions);
    questionIndex++;
})



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