const questions = [
    {
        question: " Which of the following is an example of an interpreted programming language?",
        answers: [
            { text: "C", correct: false },
            { text: "Java", correct: false },
            { text: "Python", correct: true },
            { text: "Assembly", correct: false }
        ]
    },
    {
        question: "Which OS is based on the Linux kernel?",
        answers: [
            { text: "macOS", correct: false },
            { text: "windows", correct: false },
            { text: "DOS", correct: false },
            { text: "ubuntu", correct: true }
        ]
    },
    {
        question: "Which keyword is used to define a constant in JavaScript?",
        answers: [
            { text: "var", correct: false },
            { text: "let", correct: false },
            { text: "const", correct: true },
            { text: "constant", correct: false }
        ]
    },
    {
        question: "CSS stands for",
        answers: [
            { text: "cascading style sheets", correct: true },
            { text: "cascading Sheet Style", correct: false },
            { text: "constant sheet style", correct: false},
            { text: "content sheet style", correct: false }
        ]
    },
    {
        question: "Which data structure follows the FIFO (First In, First Out) principle?",
        answers: [
            { text: "stack", correct: false },
            { text: "queue", correct: true },
            { text: "linked list", correct: false },
            { text: "hashed table", correct: false }
        ]
    },
    {
        question: "What does HTTP stand for?",
        answers: [
            { text: "HyperText Transfer Protocol", correct: true },
            { text: "High-Level Text Transfer Protocol", correct: false },
            { text: "Hyperlink Transfer Protocol", correct: false },
            { text: "HyperText Transmission Process", correct: false }
        ]
    },
    {
    question: "What is the smallest unit of data in a computer?",
    answers: [
        { text: "nibble", correct: false },
        { text: "byte", correct: false },
        { text: "kilobyte", correct: false },
        { text: "bit", correct: true }
    ]
    },
    {
        question: "Which of the following is NOT an OOP (Object-Oriented Programming) principle?",
        answers: [
            { text: "Encapsulation", correct: false },
            { text: "Abstraction", correct: false },
            { text: "Recursion", correct: true },
            { text: "Inheritance", correct: false }
        ]
    },
    {
        question: "Which of the following is NOT a primary component of a computer?",
        answers: [
            { text: "CPU", correct: false },
            { text: "RAM", correct: false },
            { text: "Hard Disk", correct: false },
            { text: "Printer", correct: true }
        ]
    },
    {
        question: "Which programming language is mainly used for Artificial Intelligence (AI)?",
        answers: [
            { text: " Java", correct: false },
            { text: "Python", correct: true },
            { text: "C", correct: false },
            { text: "Php", correct: false }
        ]
    },
    {
        question:  "Which of the following is NOT a type of machine learning?",
        answers: [
            { text: "Supervised Learning ", correct: false },
            { text: "Unsupervised Learning", correct: false },
            { text: "Reinforcement Learning", correct: false },
            { text: "Recursive Learning", correct: true }
        ]
    },
    {
        question:  "What does API stand for in software development?",
        answers: [
            { text: "Application Programming Interface", correct: true },
            { text: "Automated Processing Integration", correct: false },
            { text: "Advanced Program Instruction", correct: false },
            { text: "Application Process Interaction", correct: false }
        ]
    },
    {
        question:  "What does the acronym JSON stand for?",
        answers: [
            { text: "Java Standard Object Notation", correct: false },
            { text: " JavaScript Object Notation", correct: true },
            { text: "Java Scripting Object Naming", correct: false },
            { text: "Joint System Object Network", correct: false }
        ]
    },
    {
        question:  " What is the full form of SQL?",
        answers: [
            { text: "Structured Query Language", correct: true },
            { text: " Systematic Query Language", correct: false },
            { text: "Server Query Logic", correct: false },
            { text: "Sequential Query Language", correct: false }
        ]
    }
];

const startContainer = document.getElementById("start-container");
const startButton = document.getElementById("start-btn");
const quizContainer = document.getElementById("quiz-container");
const questionElement = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result");
const scoreDisplay = document.getElementById("score");
const timerElement = document.getElementById("timer");

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

startButton.addEventListener("click", () => {
    startContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    startQuiz();
});

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(button, answer.correct));
        answersContainer.appendChild(button);
    });

    startTimer();
}

function resetState() {
    clearInterval(timer);
    timeLeft = 15;
    timerElement.innerText = `Time: ${timeLeft}s`;
    answersContainer.innerHTML = "";
    nextButton.style.display = "none";
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = `Time: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timer);
            showCorrectAnswer();
        }
    }, 1000);
}

function selectAnswer(button, correct) {
    clearInterval(timer);
    const buttons = Array.from(answersContainer.children);

    if (correct) {
        button.classList.add("correct");
        score++;
    } else {
        button.classList.add("wrong");
        showCorrectAnswer(); // Call this function when the user chooses the wrong answer
    }

    buttons.forEach(btn => btn.disabled = true);
    nextButton.style.display = "block";
}
function showCorrectAnswer() {
    const buttons = Array.from(answersContainer.children);
    const correctAnswerText = questions[currentQuestionIndex].answers.find(ans => ans.correct).text;

    buttons.forEach(btn => {
        if (btn.innerText === correctAnswerText) {
            btn.classList.add("correct"); // Highlight the correct answer
        }
        btn.disabled = true;
    });

    nextButton.style.display = "block";
}
nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    quizContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.innerText = `${score} / ${questions.length}`;
}

function restartQuiz() {
    startContainer.classList.remove("hidden");
    resultContainer.classList.add("hidden");
    quizContainer.classList.add("hidden");
}
