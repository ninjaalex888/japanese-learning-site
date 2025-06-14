function checkAnswer(answer) {
    const result = document.getElementById('result');
    if (answer === 'thank you') {
        result.textContent = 'Correct!';
    } else {
        result.textContent = 'Try again!';
    }
}
