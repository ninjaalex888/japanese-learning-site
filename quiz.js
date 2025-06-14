const questions = [
    {
        question: 'What does "こんにちは" mean?',
        options: ['Good morning', 'Good evening', 'Hello'],
        answer: 'Hello'
    },
    {
        question: 'What does "ありがとう" mean?',
        options: ['Goodbye', 'Thank you', 'Please'],
        answer: 'Thank you'
    },
    {
        question: 'What does "助けて！" mean?',
        options: ['Excuse me', 'Help!', 'I’m lost'],
        answer: 'Help!'
    },
    {
        question: 'What does "メニューをください" mean?',
        options: ['Water, please', 'The check, please', 'Menu, please'],
        answer: 'Menu, please'
    }
];

let current = 0;

function showQuestion() {
    const q = questions[current];
    const main = document.querySelector('main');
    main.innerHTML = `
        <h2>${q.question}</h2>
        ${q.options.map(opt => `<button onclick="checkAnswer('${opt}')">${opt}</button>`).join('<br>')}
        <p id="result"></p>
        <button onclick="nextQuestion()">Next</button>
        <nav><a href="index.html">🏠 Home</a></nav>
    `;
}

function checkAnswer(selected) {
    const result = document.getElementById('result');
    const correct = questions[current].answer;
    result.textContent = selected === correct ? '✅ Correct!' : `❌ Wrong! Correct: ${correct}`;
}

function nextQuestion() {
    current = (current + 1) % questions.length;
    showQuestion();
}

document.addEventListener('DOMContentLoaded', showQuestion);
