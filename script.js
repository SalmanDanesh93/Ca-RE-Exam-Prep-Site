var score = document.getElementById("scores");
var timer;

function myFunction() {
  var x = document.getElementById("quiz");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
    onTimer();
    populate();
  }
}

i = 60;

function onTimer() {
  document.getElementById('mycounter').innerHTML = i;
  i--;

  if (i < 0) {
    alert('Quiz Over!');
    showScores();
  }
  else {
    clearInterval(i);
    setTimeout(onTimer, 1000);
    isEnded();
  }
}

function stopTimer() {
  i = null;
}

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}

function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choices;
}

function populate() {
  if(quiz.isEnded()) {
    showScores();
    stopTimer();
  }
  else {
    var element = document.getElementById("question");
    element.innerHTML = quiz.getQuestionIndex().text;

    var choise = quiz.getQuestionIndex().choices;
    for(var i = 0; i < choices.length; i++){
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }
    showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    populate();
  }
};

function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionsNumber + " of " + quiz.questions.length;
};

function showScores() {
  var gameOverHTML = "<h1>Results</h1>";
  gameOverHTML += "<h2> id='score'> Your Scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  var sText = "<input id=userInput type=text placeholder=User>";
  var saveBtn = "<button onclick=returnText()> Submit </button>";
  element.innerHTML = gameOverHTML + sText + saveBtn;
};

function returnText() {
  let input = document.getElementById("userInput").value;
  alert(input + "'s score = " + quiz.score);
}

var questions = [
  new Question("")
]