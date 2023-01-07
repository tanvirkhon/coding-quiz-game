var mainScreen = document.getElementById("main-screen");
var questionScreen = document.getElementById("question-screen");
var questionIndex;

var questions = [
  {
    question: "This is question # 1",
    choice1: "This is option # 1",
    choice2: "This is option # 2",
    choice3: "This is the correct answer",
    choice4: "This is option # 4",
  },
  {
    question: "This is question # 2",
    choice1: "This is option # 1",
    choice2: "This is option # 2",
    choice3: "This is option # 3",
    choice4: "This is option # 4",
  },
  {
    question: "This is question # 3",
    choice1: "This is option # 1",
    choice2: "This is option # 2",
    choice3: "This is option # 3",
    choice4: "This is option # 4",
  },
];

function startQuiz() {
  questionIndex = 0;
  mainScreen.classList.add("hide");
  questionScreen.classList.remove("hide");
  displayQuestion();
}

function displayQuestion() {
  console.log("Displaying question");
  document.getElementById("question-box").textContent =
    questions[questionIndex].question;
  document.getElementById("choice-one").textContent =
    questions[questionIndex].choice1;
}

function checkAnswer(event) {
  console.log(event);
  if (event.target.matches("button")) {
    console.log("A button was clicked");
    console.log(event.target.textContent);
    questionIndex++;
    displayQuestion();
  }
}

document.getElementById("start-button").addEventListener("click", startQuiz);

questionScreen.addEventListener("click", checkAnswer);
