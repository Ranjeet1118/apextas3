const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "High Transfer Machine Language", correct: false },
      { text: "Hyper Transfer Markup Logic", correct: false },
      { text: "None of the above", correct: false }
    ]
  },
  {
    question: "Which one is a JavaScript framework?",
    answers: [
      { text: "Laravel", correct: false },
      { text: "Django", correct: false },
      { text: "React", correct: true },
      { text: "MySQL", correct: false }
    ]
  },
  {
    question: "What is used to style a web page?",
    answers: [
      { text: "HTML", correct: false },
      { text: "Java", correct: false },
      { text: "CSS", correct: true },
      { text: "Python", correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextBtn = document.getElementById('next-btn');
const scoreCard = document.getElementById('score-card');
const scoreText = document.getElementById('score-text');

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreCard.style.display = 'none';
  questionEl.style.display = 'block';
  answerButtons.style.display = 'block';
  nextBtn.style.display = 'none';
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQ = questions[currentQuestionIndex];
  questionEl.innerText = currentQ.question;
  currentQ.answers.forEach(answer => {
    const btn = document.createElement('button');
    btn.innerText = answer.text;
    btn.classList.add('btn');
    if (answer.correct) btn.dataset.correct = true;
    btn.addEventListener('click', selectAnswer);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextBtn.style.display = 'none';
  answerButtons.innerHTML = '';
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('wrong');
  }

  Array.from(answerButtons.children).forEach(btn => {
    btn.disabled = true;
    if (btn.dataset.correct === "true") btn.classList.add('correct');
  });

  nextBtn.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  questionEl.style.display = 'none';
  answerButtons.style.display = 'none';
  nextBtn.style.display = 'none';
  scoreCard.style.display = 'block';
  scoreText.innerText = `🎉 You scored ${score} out of ${questions.length}!`;
}

// Joke Generator
const jokeDiv = document.getElementById('joke');
const fetchBtn = document.getElementById('fetchJokeBtn');

fetchBtn.addEventListener('click', () => {
  fetch('https://icanhazdadjoke.com/', {
    headers: { Accept: 'application/json' }
  })
  .then(res => res.json())
  .then(data => {
    jokeDiv.textContent = `😂 ${data.joke}`;
  })
  .catch(() => {
    jokeDiv.textContent = "Oops! Couldn't fetch a joke.";
  });
});

// Initialize quiz on page load
window.onload = startQuiz;
