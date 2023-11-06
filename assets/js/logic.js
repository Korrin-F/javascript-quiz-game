import { questions } from "./questions.js";  //the array containing all questions and answers

var startTime = 60;
var time = startTime;
var endTime = 0;
var nextQuestionIndex = 0;
var feedbackTime = 0;
var score = 0;
var timer = ""; 

var startScreen = document.querySelector("#start-screen"); 
var questionsScreen = document.querySelector("#questions");
var feedbackScreen = document.querySelector("#feedback");
var endScreen = document.querySelector("#end-screen");

var startButton = document.querySelector("#start");
var questionTitle = document.querySelector("#question-title");
var choicesColumn = document.querySelector("#choices");
var timeDisplay = document.querySelector("#time");
var initials = document.querySelector("#initials");
var submit = document.querySelector("#submit");
var submitWarning = document.querySelector("#submit-warning");

//------------------------------------
// COUNTDOWN TIMER
//------------------------------------
function startTimer(){
    timer = setInterval(function(){
        if (time <= 0){
            clearInterval(timer);
            score = scoreMultiplier(endTime,score);
            displayEndScreen();
            timeDisplay.textContent = 0;
            return;
        }
        time--; //subtract one second
        timeDisplay.textContent = time; // update the time with the new time
    }, 1000)
}


//------------------------------------
// DISPLAY A QUESTION WITH ANSWER BUTTONS
//------------------------------------
// q: question
// a: array of 4 answers
// aIndex: the index of the correct answer

function displayQuestion(questions){
    //update #question-title with the question
    questionTitle.textContent = questions[nextQuestionIndex].q
    //clear previous choices
    choicesColumn.innerHTML = "";
    // create an ordered list element
    let ol = document.createElement("ol");
    choicesColumn.appendChild(ol);
    let answerIndex = 0;
    //create a button for every answer option
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

//------------------------------------
// GAME START BUTTON ACTION
//------------------------------------
// when start button is clicked 
startButton.addEventListener("click", function(event){
    event.preventDefault();
    // start timer countdown from 60 seconds
    startTimer();
    // setInterval(timer, 1000);
    // change the div called "start-screen" class to "start hide"
    startScreen.setAttribute("class", "start hide");
    // change the div called "questions" class to "" so its in view
    questionsScreen.setAttribute("class", "show");
    // load the first question
    displayQuestion(questions);    
})

//------------------------------------
// FEEDBACK DISPLAY ON TIMER
//------------------------------------
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
    }, 1000)
    //show the feedback screen
    feedbackScreen.setAttribute("class", "feedback");
    
}
//------------------------------------
// GAME END SCREEN DISPLAY
//------------------------------------
function displayEndScreen(){
    //hide questions screen 
    questionsScreen.setAttribute("class", "hide");
    //unhide end screen
    endScreen.setAttribute("class", "");
    //show the final score in final-score span
    let finalScoreDisplay = document.querySelector("#final-score");
    finalScoreDisplay.textContent = score;
}

//------------------------------------
// AN ANSWER IS SELECTED
//------------------------------------
choicesColumn.addEventListener("click", function(event){
    event.preventDefault();
    let element = event.target;

    // if the clicked element is not a button then do nothing
    if (element.tagName !== "BUTTON"){
        return;
    }
    
    // if the element is a button then grab the data-index value
    let dataIndex = element.getAttribute("data-index");

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
        //display incorrect in the feedback section for 2 seconds
        displayFeedback("Wrong!");
        //remove 10 seconds from the timer
        time = time - 10;
    }
    

    //if all questions have been answered
    if(nextQuestionIndex>=questions.length){
        endTime = time;
        score = scoreMultiplier(endTime,score);
        clearInterval(timer);
        timeDisplay.textContent = 0;
        displayEndScreen();
        return;
    }
    //display next question 
    displayQuestion(questions);

})

//------------------------------------
// FINAL SCORE MULTIPLIER
//------------------------------------
function scoreMultiplier(time, score){
    let newScore = 0;
    //if score is less than zero then make it zero
    if(score<0){
        return 0;
    }
    //if time is between 100% & 75% then multiply by 75
    if(time >= (startTime * 0.75)){
        newScore = score * 75;
    //if time is between 74% & 50% then multiply by 50
    }else if (time >= (startTime * 0.5)){
        newScore = score * 50;
    //if time is between 49% & 25% then multiply by 25
    }else if (time >= (startTime * 0.25)){
        newScore = score * 25;
    //if time is between 24% & 0 then do nothing
    }else{
        return score;
    }
    return newScore;
}
//------------------------------------
// SAVE SCORE AND INITIALS TO LOCAL STORAGE
//------------------------------------
function saveScore(text,score){
    //retrieve the highscores array and add a new high score to it
    let highscores =  JSON.parse(localStorage.getItem("highscores"));
    let newScore = {
        i: text,
        s: score
    }
    //if there are no saved highscores then create the first one
    if(highscores===null){
        let scoresArray = [];
        scoresArray.push(newScore);
        localStorage.setItem("highscores", JSON.stringify(scoresArray))
        return;
    }
    highscores.push(newScore);
    localStorage.setItem("highscores", JSON.stringify(highscores))
}

//add the highscore to local storage when submit button is pressed
submit.addEventListener("click", function(event){
    //check if the text box actually has content
    let text = initials.value;
    if(text === ""){
        //add a message that says "please enter your initials"
        submitWarning.textContent = "Please enter your initials.";
        return;
    }
    saveScore(text,score);
    // go to the highscores page
    window.location.href = "highscores.html";
})


