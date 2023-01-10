var mainScreen = document.getElementById("main-screen");
var questionScreen = document.getElementById("question-screen");
var playerTime = document.getElementById("player-time");
var playerName = document.getElementById("player-name");
var saveButton = document.getElementById("save");
var questionIndex;
var timeLeft = 60;
var playerScore = 0;

var questions = [
  {
    question: "What is the correct JavaScript syntax to write “Hello World”?",
    choice1: "System.out.println(“Hello World”)",
    choice2: "println (“Hello World”)",
    choice3: "document.write(“Hello World”)",
    choice4: "response.write(“Hello World”)",
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choice1: " <js>",
    choice2: "<scripting>",
    choice3: "<script>",
    choice4: "<javascript>",
  },
  {
    question:
      "The _______ method of an Array object adds and/or removes elements from an array.",
    choice1: "Reverse",
    choice2: "Shift",
    choice3: "Splice",
    choice4: "Slice",
  },
];

// Function to start quiz
function startQuiz() {
  questionIndex = 0;
  mainScreen.classList.add("hide");
  questionScreen.classList.remove("hide");
  displayQuestion();
  countdown();
}

// Timer Function
function countdown() {
  var timeInterval = setInterval(function () {
    timeLeft--;
    playerTime.textContent = timeLeft + " seconds left";

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      questionScreen.classList.add("hide");
      playerName.classList.remove("hide");
      console.log("time up");
    }
  }, 1000);
}

// Function to Display quiz question on screen dynamically
function displayQuestion() {
  document.getElementById("question-box").textContent =
    questions[questionIndex].question;
  document.getElementById("choice-one").textContent =
    questions[questionIndex].choice1;
  document.getElementById("choice-two").textContent =
    questions[questionIndex].choice2;
  document.getElementById("choice-three").textContent =
    questions[questionIndex].choice3;
  document.getElementById("choice-four").textContent =
    questions[questionIndex].choice4;
}

// Function to check if answer is clicked and move to the next question
function checkAnswer(event) {
  console.log(event);
  if (questionIndex === 2) {
    questionIndex = 0;
    questionScreen.classList.add("hide");
    playerName.classList.remove("hide");
  }

  if (event.target.matches("button#choice-three")) {
    console.log("A button was clicked");
    console.log(event.target.textContent);
    playerScore = playerScore + 5;
    console.log("Player score is: " + playerScore);
    questionIndex++;
    displayQuestion();
  } else {
    timeLeft = timeLeft - 10;
    questionIndex++;
    displayQuestion();
  }
}

// Function to save player name and score
function saveLastScore() {
  // Save related form data as an object
  var playerHighScore = {
    student: playerName.input,
  };
  // Use .setItem() to store object in storage and JSON.stringify to convert it as a string
  localStorage.setItem("playerHighScore", JSON.stringify(playerHighScore));
  return;
}

function renderLastScore() {
  // Use JSON.parse() to convert text to JavaScript object
  var lastScore = JSON.parse(localStorage.getItem("playerHighScore"));
  // Check if data is returned, if not exit out of the function
  if (lastScore !== null) {
    document.getElementById("hs-player-name").innerHTML = lastScore.student;
  } else {
    return;
  }
}

saveButton.addEventListener("click", function (event) {
  event.preventDefault();
  saveLastScore();
  renderLastScore();
});

document.getElementById("start-button").addEventListener("click", startQuiz);

questionScreen.addEventListener("click", checkAnswer);
