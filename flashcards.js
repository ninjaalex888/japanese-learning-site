const cards = [
    // Greetings
    { q: 'こんにちは', a: 'Hello (Konnichiwa)' },
    { q: 'おはようございます', a: 'Good morning (Ohayou gozaimasu)' },
    { q: 'こんばんは', a: 'Good evening (Konbanwa)' },
    // Numbers
    { q: '一', a: '1 (Ichi)' },
    { q: '二', a: '2 (Ni)' },
    { q: '三', a: '3 (San)' },
    // Directions
    { q: '左', a: 'Left (Hidari)' },
    { q: '右', a: 'Right (Migi)' },
    { q: 'まっすぐ', a: 'Straight (Massugu)' }
];

let i = 0;

function startCards() {
    showCard();
}

function showCard() {
    const fc = document.getElementById('flashcard');
    fc.innerHTML = `
        <h2>${cards[i].q}</h2>
        <button onclick="showAnswer()">Show Answer</button>
        <p id="answer" style="display:none;">${cards[i].a}</p>
        <button onclick="next()">Next</button>
    `;
}

function showAnswer() {
    document.getElementById('answer').style.display = 'block';
}

function next() {
    i = (i + 1) % cards.length;
    showCard();
}
