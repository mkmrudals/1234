const choices = ['바위', '가위', '보'];
const choiceToEmoji = {
    '바위': '✊',
    '가위': '✌️',
    '보': '✋'
};

// DOM 요소 가져오기
const choiceButtons = document.querySelectorAll('.choices button');
const countdownDisplay = document.getElementById('countdown');
const playerChoiceEl = document.getElementById('player-choice');
const computerChoiceEl = document.getElementById('computer-choice');
const resultMessage = document.getElementById('result-message');
const resetButton = document.getElementById('reset-button');

let isPlaying = false;

// --- Event Listeners ---
resetButton.addEventListener('click', initializeGame);

choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!isPlaying) {
            playRound(button.dataset.choice);
        }
    });
});

// --- Game Logic ---

function initializeGame() {
    isPlaying = false;
    countdownDisplay.textContent = '가위바위보 중 하나를 선택하세요!';
    resultMessage.textContent = '결과';
    playerChoiceEl.textContent = '';
    computerChoiceEl.textContent = '';
    choiceButtons.forEach(button => button.disabled = false);
    resetButton.style.display = 'none';
}

function playRound(playerChoice) {
    isPlaying = true;
    choiceButtons.forEach(button => button.disabled = true);
    resultMessage.textContent = '';
    
    let count = 3;
    countdownDisplay.textContent = count;

    const countdownInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownDisplay.textContent = count;
        } else {
            clearInterval(countdownInterval);
            countdownDisplay.textContent = '결과는...';
            showResult(playerChoice);
        }
    }, 1000);
}

function showResult(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    const winner = getWinner(playerChoice, computerChoice);

    playerChoiceEl.textContent = choiceToEmoji[playerChoice];
    computerChoiceEl.textContent = choiceToEmoji[computerChoice];
    resultMessage.textContent = winner;

    resetButton.style.display = 'block';
    isPlaying = false;
}

function getWinner(player, computer) {
    if (player === computer) {
        return '무승부!';
    }
    if (
        (player === '바위' && computer === '가위') ||
        (player === '가위' && computer === '보') ||
        (player === '보' && computer === '바위')
    ) {
        return '승리!';
    }
    return '패배!';
}

// Initial game start
initializeGame();