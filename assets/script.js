var mainScreen = document.getElementById("main-screen");
var questionScreen = document.getElementById("question-screen");
var playerTime = document.getElementById("player-time");
var playerNameSection = document.getElementById("player-name-section");
var playerName = document.getElementById("player-name");
var saveButton = document.getElementById("save");
var restartButton = document.getElementById("restart");
var questionIndex;
var timeLeft = 25;
var playerScore = 0;

// Object to hold the quiz questions
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
  {
    question: "JavaScript entities start with _______ and end with _________.",
    choice1: "Semicolon, colon",
    choice2: "Semicolon, Ampersand",
    choice3: "Ampersand, semicolon",
    choice4: "Ampersand, colon",
  },
  {
    question: "JavaScript is interpreted by _________",
    choice1: "Server",
    choice2: "Object",
    choice3: "Client",
    choice4: "None of the above",
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
      playerNameSection.classList.remove("hide");
      document.getElementById("hs-player-name").textContent =
        "Your Score is: " + playerScore + " out of 5";
      renderLastScore();
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
  if (questionIndex === 4) {
    questionIndex = 0;
    questionScreen.classList.add("hide");
    playerNameSection.classList.remove("hide");
    document.getElementById("hs-player-name").textContent =
      "Your Score is: " + playerScore + " out of 5";
    renderLastScore();
  }

  if (event.target.matches("button#choice-three")) {
    playerScore = playerScore + 1;
    questionIndex++;
    displayQuestion();
  } else {
    timeLeft = timeLeft - 5;
    questionIndex++;
    displayQuestion();
  }
}

// Function to save player name and score
saveButton.addEventListener("click", function (event) {
  event.preventDefault();
  var playerHighScore = {
    player: playerName.value,
    score: playerScore,
  };
  localStorage.setItem("playerHighScore", JSON.stringify(playerHighScore));
  return;
});

// Function to show last score saved on this local machine
function renderLastScore() {
  var lastScore = JSON.parse(localStorage.getItem("playerHighScore"));
  document.getElementById("high-scores").innerHTML =
    lastScore.player + " your last score was: " + lastScore.score + " out of 5";
}

// Restart Button Function
restartButton.addEventListener("click", function () {
  window.location.reload();
});

// Start Quiz on Click
document.getElementById("start-button").addEventListener("click", startQuiz);

// Check if answer is correct
questionScreen.addEventListener("click", checkAnswer);
