import { questions } from "./questions.js";  //the array containing all questions and answers

var time = 60;
var nextQuestionIndex = 0;
var feedbackTime = 0;
var score = 0;

var startScreen = document.querySelector("#start-screen"); 
var questionsScreen = document.querySelector("#questions");
var feedbackScreen = document.querySelector("#feedback");
var endScreen = document.querySelector("#end-screen");

var startButton = document.querySelector("#start");
var questionTitle = document.querySelector("#question-title");
var choicesColumn = document.querySelector("#choices");
var timeDisplay = document.querySelector("#time");

function timer() {
    if (time <= 0){
        // clearInterval(timer);
        displayEndScreen();
        timeDisplay.textContent = 0;
        return;
    }
    time--; //subtract one second
    
    timeDisplay.textContent = time; // update the time with the new time
}
// q: question
// a: array of 4 answers
// aIndex: the index of the correct answer

function displayQuestion(questions){
    //update #question-title with the question
    // console.log("Result at index: " + nextQuestionIndex + "is: " + questions[nextQuestionIndex]);
    questionTitle.textContent = questions[nextQuestionIndex].q
    //clear previous choices
    choicesColumn.innerHTML = "";
    // create an ordered list element
    let ol = document.createElement("ol");
    choicesColumn.appendChild(ol);
    let answerIndex = 0;

    for(var answer of questions[nextQuestionIndex].a){
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
    nextQuestionIndex++;
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
    console.log("Question index: "+nextQuestionIndex);
    
})

function displayFeedback(feedback){
    //for two seconds show the feedback Correct! or Wrong!
    feedbackScreen.textContent = feedback;
    feedbackTime = 1000;
    let feedbackTimer = setInterval(function(){
        if (feedbackTime >= 2000){
            //stop the timer
            clearInterval(feedbackTimer);
            feedbackScreen.setAttribute("class", "feedback hide");
        }
        feedbackTime += 1000;
        // console.log("feedback Time is now: "+ feedbackTime);
    }, 1000)
    //show the feedback screen
    feedbackScreen.setAttribute("class", "feedback");
    
}

function displayEndScreen(){
    //hide questions screen 
    questionsScreen.setAttribute("class", "hide");
    //
    //unhide end screen
    endScreen.setAttribute("class", "");
    //show the final score in final-score span
    let finalScoreDisplay = document.querySelector("#final-score");
    finalScoreDisplay.textContent = score;
}

choicesColumn.addEventListener("click", function(event){
    event.preventDefault();
    let element = event.target;
    // console.log(element)
    // if the clicked element is not a button then do nothing
    if (element.tagName !== "BUTTON"){
        return;
    }
    
    // if the element is a button then grab the data-index value
    let dataIndex = element.getAttribute("data-index");
    console.log("Question index: "+nextQuestionIndex);
    console.log("Button index: "+dataIndex);
    console.log("Answer index: "+questions[nextQuestionIndex-1].aIndex);
    // compare the data-index value to the correct answer value
    // console.log("data index: "+ dataIndex);
    // console.log("correct answer index : "+ questions[nextQuestionIndex].aIndex);
    //if the button pressed matches the answer index value
    if(Number(dataIndex) == questions[nextQuestionIndex-1].aIndex){
        //this answer is correct 
        // add 7 points to the total
        score+=7;
        // console.log("score is now: "+score);
        //display correct in the feedback section for 2 seconds
        displayFeedback("Correct!");
    }else{
        //this answer is incorrect
        //subtract 3 points from the total score
        score-=3;
        // console.log("score is now: "+score);

        //display incorrect in the feedback section for 2 seconds
        displayFeedback("Wrong!");
        //remove 10 seconds from the timer
        time = time - 10;
    }
    
     //add one index to nextQuestionIndex
    // console.log("Questions array length: "+questions.length);
    //if all questions have been answered
    if(nextQuestionIndex>=questions.length){
        displayEndScreen();
        return;
    }
    //display next question 
    displayQuestion(questions);
    // nextQuestionIndex++;
    // console.log("Next index is now: "+ nextQuestionIndex);
})





    //localStorage.setItem("testItem", "abcdefghijkl");


    // change the div called "questions" class to "hide"
    // change the div called "feedback" class to "feedback" so its in view