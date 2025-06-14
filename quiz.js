const questions = [
    { question: 'What does "こんにちは" mean?', opts: ['Hello', 'Thank you', 'Help!'], ans: 'Hello' },
    { question: 'How do you say "2" in Japanese?', opts: ['Ichi', 'Ni', 'San'], ans: 'Ni' },
    { question: 'What does "駅はどこですか？" mean?', opts: ['Where is the station?', 'Where is the hospital?', 'Where is the toilet?'], ans: 'Where is the station?' },
    { question: 'Translate "助けて！"', opts: ['Excuse me', 'Thank you', 'Help!'], ans: 'Help!' }
];

let cur = 0;

function load() {
    render();
}

function render() {
    const q = questions[cur];
    const main = document.querySelector('main');
    main.innerHTML = `
        <h2>${q.question}</h2>
        ${q.opts.map(o=>`<button onclick="check('${o}')">${o}</button>`).join('<br>')}
        <p id="res"></p>
        <button onclick="next()">Next</button>
        <nav><a href="index.html">🏠 Home</a></nav>
    `;
}

function check(sel) {
    document.getElementById('res').textContent = sel === questions[cur].ans ? '✅ Correct!' : `❌ Correct answer: ${questions[cur].ans}`;
}

function next() {
    cur = (cur + 1) % questions.length;
    render();
}

document.addEventListener('DOMContentLoaded', load);
