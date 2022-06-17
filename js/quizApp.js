//Gets Elements by Id
function _(elm) {
    return document.getElementById(elm);
}
//Select DOM elements
const loadQuizBtn = _("loadQuiz");
const questionNo = _("questionNo");
const progressBar = _("progress");
const quizBody = document.querySelector(".quiz-body");
const answers = document.querySelectorAll(".option");

let totalWidth = 100;
var currentWidth = 0;

function showProgress() {
    int = setInterval(startProgress, 1000);
}

//Start progressbar
function startProgress() {
    currentWidth += 100/30;
    progressBar.style.width = currentWidth + '%';
    if (currentWidth >= totalWidth) {
        clearInterval(int);
    }
}

function resetProgress() {
    currentWidth = 0;
}

//Set interval
function setInt() {
    interval = setInterval(startTimer, 1000);
}

const timerContainer = document.querySelector('.time');
var sec = 30;

//Start the timer-------------------------------
function startTimer() {
    timerContainer.innerText = sec < 10 ? '0' + sec : sec;
    sec--;
    if (sec < 5) {
        timerContainer.style.color = "red";
    }

    if (sec < 0) {
        clearInterval(interval);
        timerActions();
    }
}

function resetTimer() {
    sec = 30;
}


let currentQtn = 0;

//Load quiz---------------------------------------------
function loadQuiz() {
    resetProgress();
    resetTimer(); //-> Resets timer everytime another question is loaded
    timerContainer.innerText = sec;
    timerContainer.style.color = "";
    progressBar.style.width = currentWidth + '%';
    setInt(); // -> Starts the timer
    deselectAnswers(); // -> Deselects answers whenever quiz is loaded
    setTimeout(showProgress, 1000) //-> Delay one second and the show progressbar
    let quizDataQtn = quizData[currentQtn];
    questionNo.innerHTML = `<h3>${currentQtn + 1} of ${quizData.length}<h3>`;
    question.innerText = quizDataQtn.question
    a.innerText = quizDataQtn.a;
    b.innerText = quizDataQtn.b;
    c.innerText = quizDataQtn.c;
    d.innerText = quizDataQtn.d;
}
//Loads quiz at start
loadQuiz();

//Loads anothe question when button is clicked
loadQuizBtn.addEventListener('click', () => {
    currentQtn++;
    if (currentQtn < quizData.length) {
        loadQuiz();
    } else {
        timerContainer.innerText = "00";
        timerContainer.style.color = "";
        progressBar.style.display = "none";
        quizBody.innerHTML = `
        <center>
        <h1>👍</h1>
       <h2>You've completed the quiz</h2>
       <h3 class="score">You have scored ${score}/${quizData.length} questions</h3>
       <button class="btn" id="load" onclick="window.location.reload()">Load Again</button>
       <center>
       `
    }

});

//Select answer and check its validity
let score = 0;

function checkAnswer() {
    answers.forEach(answer => {
        answer.addEventListener('click', (e) => {
            clearInterval(interval);
            clearInterval(int);
            loadQuizBtn.classList.remove('disable');
            let clicked = e.target;
            answer.parentNode.parentNode.classList.add('disable');
            let ans = answer.id;
            let correctAns = quizData[currentQtn].correct;
            if (ans === correctAns) {
                score++;
                clicked.parentNode.classList.add('correct');
            } else {
                clicked.parentNode.classList.add('wrong');

                for (i = 0; i < answers.length; i++) {
                    if (answers[i].id == correctAns) {
                        answers[i].parentNode.classList.add('correct');
                    }
                }
            }
        });
    });
}

checkAnswer();

//Deselects answers-----------------------------
function deselectAnswers() {
    answers.forEach(answer => {
        loadQuizBtn.classList.add('disable');
        answer.parentNode.classList.remove('wrong');
        answer.parentNode.classList.remove('correct');
        answer.parentNode.parentNode.classList.remove('disable');
    });
}

//Manipulate quiz ui when timer reached 00
function timerActions() {
    answers.forEach(answer => {
        loadQuizBtn.classList.remove('disable');
        let ans = answer.id;
        if (ans === quizData[currentQtn].correct) {
            answer.parentNode.classList.add('correct');
        }
        answer.parentNode.parentNode.classList.add('disable');
    });
}
