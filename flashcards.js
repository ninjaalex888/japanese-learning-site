const cards = [
    { question: 'How do you say "Hello" in Japanese?', answer: 'こんにちは (Konnichiwa)' },
    { question: 'How do you say "Thank you"?', answer: 'ありがとう (Arigatou)' },
    { question: 'How do you say "Goodbye"?', answer: 'さようなら (Sayounara)' }
];

let current = 0;

function showAnswer() {
    document.getElementById('answer').style.display = 'block';
    document.getElementById('answer').innerText = cards[current].answer;
}

function nextCard() {
    current = (current + 1) % cards.length;
    document.getElementById('question').innerText = cards[current].question;
    document.getElementById('answer').style.display = 'none';
}
